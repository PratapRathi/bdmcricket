import Image from "next/image";
import Link from "next/link";
import { getCompanyContent } from "@/lib/data/company";
import { getCategories, getProducts } from "@/lib/data/catalog";
import { CinematicHero } from "@/features/home/components/cinematic-hero";
import { HomeStory } from "@/features/home/components/home-story";
import { CentenaryFeature } from "@/features/home/components/centenary-feature";
import { ProductCard } from "@/features/products/components/product-card";
import { VideoFeature } from "@/features/media/components/video-feature";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function HomePage() {
  const [featureCategories, products, content] = await Promise.all([getCategories(), getProducts(), getCompanyContent()]);
  const { awards, companyStory, newsNotice, rating, history, company, centenary } = content;
  const featuredProducts = products.filter((product) => product.isFeatured).sort((a, b) => (a.featuredSortOrder ?? Infinity) - (b.featuredSortOrder ?? Infinity)).slice(0, 4);
  const heroProduct = featuredProducts[0] ?? products[0];
  if (!heroProduct) throw new Error("The product catalogue is empty.");
  return (
    <>
      <CinematicHero founded={company.founded} product={heroProduct} />

      <section className="category-ticker" aria-label="Shop product categories">
        <div className="category-ticker-track">
          {[...featureCategories, ...featureCategories].map((category, index) => (
            <Link key={`${category.slug}-${index}`} href={`/${category.slug}`} className="ticker-item">{category.name}<span aria-hidden="true">✳</span></Link>
          ))}
        </div>
      </section>

      <HomeStory history={history} storyImage={company.storyImage} product={heroProduct} />
      <CentenaryFeature founded={company.founded} {...centenary} />

      <section className="section-pad bg-[#e8e3d8]">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="Find your equipment" title="Every part of the game." description="Explore BDM cricket bats, match equipment, protective gear, and the essentials around them." />
            <ButtonLink href="/products" variant="outline" className="self-start md:self-auto">View all categories</ButtonLink>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:mt-16 lg:gap-5">
            {featureCategories.map((category, index) => {
              const product = products.find((item) => item.categorySlug === category.slug);
              return (
                <Reveal key={category.slug} delay={index * 60} className={`category-card category-card-${index + 1}`}>
                  <Link href={`/${category.slug}`} className="group relative flex min-h-[260px] flex-col overflow-hidden p-4 sm:min-h-[360px] sm:p-6 lg:min-h-[440px]">
                    <div className="relative z-10 flex items-start justify-between gap-2">
                      <span className="category-index">0{index + 1} / 06</span>
                      <span className="category-arrow" aria-hidden="true">↗</span>
                    </div>
                    {product && <Image src={product.image} alt="" width={430} height={430} sizes="(max-width: 640px) 50vw, 30vw" className="category-card-image absolute inset-x-3 top-[18%] h-[60%] w-[calc(100%-1.5rem)] object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105 sm:inset-x-6 sm:w-[calc(100%-3rem)]" />}
                    <div className="relative z-10 mt-auto flex items-end justify-between gap-2">
                      <div><h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.045em] sm:text-3xl">{category.name}</h3><p className="mt-2 text-xs text-ink/55">{category.count} products</p></div>
                      <span className="hidden text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/55 sm:block">Explore</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Selected from the range" title="Made to take the field." description="A closer look at products listed by BDM Cricket. Prices are shown where the source catalogue provides them." />
            <ButtonLink href="/products" variant="dark" className="self-start sm:self-auto">Shop the range</ButtonLink>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:mt-16 lg:grid-cols-4">
            {featuredProducts.map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink text-white">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-12">
          <Reveal className="flex flex-col justify-between">
            <div>
              <p className="eyebrow text-brand-red">Built around the sport</p>
              <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[0.97] tracking-[-0.06em] sm:text-6xl">From a family workshop to a full cricket range.</h2>
            </div>
            <div className="mt-12 flex items-center gap-5 border-t border-white/15 pt-6">
              <span className="font-display text-5xl font-semibold tracking-[-0.08em] text-brand-red">1925</span>
              <p className="max-w-[180px] text-xs leading-5 text-white/55">The year the Mahajan family’s cricket trade began in Sialkot.</p>
            </div>
          </Reveal>
          <Reveal className="grid gap-5">
            <div className="border-l-2 border-brand-red pl-6 sm:pl-9">
              <p className="font-display text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{companyStory[0]}</p>
            </div>
            <p className="max-w-2xl pl-6 text-sm leading-7 text-white/60 sm:pl-9 sm:text-base">{companyStory[1]}</p>
            <div className="mt-4 flex flex-wrap gap-4 pl-6 sm:pl-9">
              <ButtonLink href="/company-insights" variant="light">How BDM works</ButtonLink>
              <ButtonLink href="/quality" variant="outline">Quality &amp; standards</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid overflow-hidden bg-brand-blue text-white lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
              <p className="eyebrow text-white/55">Recognition &amp; trust</p>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl">A record built over generations.</h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base">The company profile records a National Award for Quality Product from MSME in 2005, alongside further industry recognition.</p>
              <div className="mt-9 flex flex-wrap items-end gap-8 border-t border-white/20 pt-6">
                <div><p className="font-display text-5xl font-semibold tracking-[-0.07em]">{rating.score}<span className="text-2xl text-brand-red">/5</span></p><p className="mt-1 text-xs text-white/55">Rating shown on the source site</p></div>
                <div><p className="font-display text-4xl font-semibold tracking-[-0.06em]">{rating.count}</p><p className="mt-1 text-xs text-white/55">User reviews on source site</p></div>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="/awards" variant="light">Explore recognition</ButtonLink>
                <ButtonLink href="/testimonial" variant="outline">Ratings &amp; reviews</ButtonLink>
              </div>
            </div>
            <div className="award-image relative min-h-[360px] bg-[#d6d0c4] sm:min-h-[520px]">
              <Image src={awards[0].image} alt="B. D. Mahajan receiving the MSME National Award for Quality Product" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <p className="absolute bottom-5 left-5 max-w-[220px] bg-ink/80 px-4 py-3 text-[10px] font-semibold uppercase leading-5 tracking-[0.15em] text-white">National Award for Quality Product · 2005</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#e8e3d8]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 lg:px-12">
          <Reveal>
            <p className="eyebrow text-brand-red">Inside BDM</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl">See the story behind the badge.</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-ink/65">A corporate film from the BDM Cricket source site.</p>
            <ButtonLink href="/corporate-video" variant="dark" className="mt-8">Explore BDM media</ButtonLink>
          </Reveal>
          <Reveal><VideoFeature company={company} /></Reveal>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-12">
          <div>
            <p className="eyebrow text-brand-red">Latest from BDM</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl">News, notes &amp; useful updates.</h2>
            <Link href="/news" className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-ink hover:text-brand-red">View all updates <span aria-hidden="true">↗</span></Link>
          </div>
          <Link href="/news" className="news-teaser group">
            <span className="eyebrow text-brand-red">Company notice</span>
            <h3 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">{newsNotice.title}</h3>
            <p className="mt-4 max-w-xl text-sm leading-6 text-ink/60">{newsNotice.body}</p>
            <span className="mt-7 inline-flex items-center gap-3 text-sm font-semibold">Read the notice <span className="transition-transform group-hover:translate-x-1">→</span></span>
          </Link>
        </div>
      </section>

      <section className="final-cta">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:px-12 lg:py-24">
          <div><p className="eyebrow text-white/50">Let’s talk cricket</p><h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl">Looking for the right equipment?</h2></div>
          <ButtonLink href="/enquiry" variant="light" className="shrink-0">Contact BDM</ButtonLink>
        </div>
      </section>
    </>
  );
}
