#!/usr/bin/env python3
"""Extract product records and their local images from the original site clone."""

from __future__ import annotations

import html
import json
import re
import sys
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

SOURCE = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("../bdmcricket")
OUTPUT = Path("data/products.ts")

CATEGORIES = {
    "cricket-bat": ("Cricket Bats", "Bats for club and match play"),
    "bdm-english-willow-cricket-bat": ("English Willow Bats", "English willow bats from the BDM range"),
    "cricket-ball": ("Cricket Balls", "Leather and training balls"),
    "leather-cricket-ball": ("Leather Cricket Balls", "Leather balls for match play and practice"),
    "cricket-batting-gloves": ("Batting Gloves", "Batting gloves across the BDM range"),
    "wicket-keeping-gloves": ("Wicket Keeping Gloves", "Gloves for wicket keepers"),
    "cricket-wicketkeeping-gloves": ("Wicket Keeping Gloves", "Gloves for wicket keepers"),
    "cricket-batting-pad": ("Batting Pads", "Protection for the crease"),
    "cricket-wicketkeeping-pad": ("Wicket Keeping Pads", "Pads for wicket keepers"),
    "cricket-helmet": ("Cricket Helmets", "Protective helmets for cricket"),
    "cricket-kit-bag": ("Kit Bags", "Bags for carrying cricket equipment"),
    "cricket-protective-equipment": ("Protective Equipment", "Protective cricket equipment"),
    "cricket-accessories": ("Accessories", "Training and match-day accessories"),
    "cricket-hat": ("Cricket Hats", "Cricket hats and caps"),
    "white-cricket-wear": ("Cricket Wear", "White cricket clothing"),
    "cricket-battingpad-sportsacademy": ("Academy Equipment", "Equipment featured for cricket academies"),
    "cricket-equipments": ("Cricket Accessories", "Additional cricket equipment"),
}


class ImageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.images: list[tuple[str, str]] = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() != "img":
            return
        values = dict(attrs)
        alt, src = (values.get("alt") or "").strip(), values.get("src") or ""
        if alt and src.startswith("assets/") and not src.startswith("assets/loader"):
            self.images.append((alt, src))


def js_unquote(raw: str) -> str:
    try:
        return json.loads('"' + raw.replace("\\'", "'") + '"')
    except json.JSONDecodeError:
        return raw.replace("\\'", "'").replace("\\\"", '"').replace("\\n", " ")


def object_end(source: str, start: int) -> int:
    depth = 0
    quoted = escaped = False
    for i in range(start, len(source)):
        char = source[i]
        if quoted:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == '"':
                quoted = False
        elif char == '"':
            quoted = True
        elif char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                return i + 1
    return len(source)


def field(record: str, name: str) -> str:
    match = re.search(r'"' + re.escape(name) + r'"\s*:\s*"((?:\\.|[^"\\])*)"', record)
    return js_unquote(match.group(1)) if match else ""


def specs(record: str) -> list[dict[str, str]]:
    result = []
    for match in re.finditer(r'\{\s*"FK_IM_SPEC_MASTER_DESC"\s*:\s*"((?:\\.|[^"\\])*)"\s*,\s*"SUPPLIER_RESPONSE_DETAIL"\s*:\s*"((?:\\.|[^"\\])*)"', record):
        key, value = js_unquote(match.group(1)).strip(), js_unquote(match.group(2)).strip()
        if key and value and key.lower() != "brand":
            result.append({"name": key, "value": html.unescape(value)})
    return result


def slugify(value: str) -> str:
    value = value.lower().replace("&", " and ")
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value


def local_images(name: str, candidates: list[str], asset_dir: Path) -> list[str]:
    selected: list[str] = []
    for candidate in candidates:
        if candidate.startswith("assets/") and (asset_dir / candidate.removeprefix("assets/")).is_file():
            if candidate not in selected:
                selected.append(candidate)
    selected.sort(key=lambda path: ("500x500" not in path and "500x" not in path, "250x" in path, "125x" in path))
    if selected:
        return ["/" + path for path in selected[:4]]

    remote_names = []
    for path in re.findall(r'"img_path(?:1)?"\s*:\s*"((?:\\.|[^"\\])*)"', " ".join(candidates)):
        remote_names.append(Path(unquote(urlparse(js_unquote(path)).path)).stem)
    slug = slugify(name)
    for item in asset_dir.iterdir():
        normalized = item.stem.lower()
        if slug[:24] in normalized and ("500" in normalized or "250" in normalized):
            selected.append("/assets/" + item.name)
    return selected[:4] or ["/assets/bdm-dyna-drive-cricket-bat-500x500-11bmnoi1.png"]


def main() -> None:
    image_map: dict[str, list[str]] = defaultdict(list)
    for path in SOURCE.glob("*.html"):
        parser = ImageParser()
        parser.feed(path.read_text(encoding="utf-8", errors="replace"))
        for alt, src in parser.images:
            key = re.sub(r"\s+", " ", alt).strip().casefold()
            if src not in image_map[key]:
                image_map[key].append(src)

    unique: dict[str, dict] = {}
    for route, (category, _description) in CATEGORIES.items():
        source = SOURCE / f"{route}.html"
        if not source.exists():
            continue
        markup = source.read_text(encoding="utf-8", errors="replace")
        for match in re.finditer(r'\{\s*"img_id"\s*:', markup):
            record = markup[match.start():object_end(markup, match.start())]
            name = html.unescape(field(record, "prd_name")).strip()
            if not name:
                continue
            slug = slugify(name)
            image_candidates = image_map.get(re.sub(r"\s+", " ", name).casefold(), [])
            image = local_images(name, image_candidates, SOURCE / "assets")
            price = html.unescape(field(record, "prd_price")).replace("\u00a0", " ").strip()
            price = re.sub(r"^(?:Rs\s*)+", "Rs ", price, flags=re.I).strip()
            specs_list = specs(record)
            if slug not in unique:
                unique[slug] = {
                    "slug": slug,
                    "name": name,
                    "category": category,
                    "categorySlug": route,
                    "price": price,
                    "image": image[0],
                    "images": image,
                    "productCode": field(record, "prd_code"),
                    "specifications": specs_list,
                }
            else:
                existing = unique[slug]
                if not existing["price"] and price:
                    existing["price"] = price
                if len(specs_list) > len(existing["specifications"]):
                    existing["specifications"] = specs_list
                for src in image:
                    if src not in existing["images"] and len(existing["images"]) < 4:
                        existing["images"].append(src)

    categories = []
    for route, (label, description) in CATEGORIES.items():
        count = sum(item["categorySlug"] == route for item in unique.values())
        if count:
            categories.append({"slug": route, "name": label, "description": description, "count": count})

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        "// Extracted from the supplied BDM Cricket site clone. Keep source facts intact.\n"
        "export type ProductSpecification = { name: string; value: string };\n"
        "export type Product = { slug: string; name: string; category: string; categorySlug: string; price: string; image: string; images: string[]; productCode: string; specifications: ProductSpecification[] };\n"
        "export type ProductCategory = { slug: string; name: string; description: string; count: number };\n\n"
        "export const categories: ProductCategory[] = " + json.dumps(categories, ensure_ascii=False, indent=2) + ";\n\n"
        "export const products: Product[] = " + json.dumps(list(unique.values()), ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print(f"Extracted {len(unique)} unique products across {len(categories)} categories into {OUTPUT}")


if __name__ == "__main__":
    main()
