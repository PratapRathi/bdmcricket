"use client";

import Image from "next/image";
import { useState } from "react";
import type { getCompanyContent } from "@/lib/data/company";

type Company = Awaited<ReturnType<typeof getCompanyContent>>["company"];

export function VideoFeature({ company }: { company: Company }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video-frame">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${company.videoId}?autoplay=1&rel=0`}
          title="BDM Cricket corporate video"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <>
          <Image src={company.videoThumbnail} alt="Preview of the BDM Cricket corporate video" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          <div className="absolute inset-0 bg-ink/25" />
          <button type="button" aria-label="Play BDM Cricket corporate video" onClick={() => setPlaying(true)} className="video-play">
            <span aria-hidden="true">▶</span>
          </button>
          <span className="absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[0.17em] text-white">BDM · Corporate film</span>
        </>
      )}
    </div>
  );
}
