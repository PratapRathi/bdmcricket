import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getCompanyContent } from "@/lib/data/company";
import { getCategories, getProducts } from "@/lib/data/catalog";
import { getEditorialConfig as readEditorialConfig } from "@/lib/data/company";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { VideoFeature } from "@/features/media/components/video-feature";
import { ContactForm } from "@/features/company/components/contact-form";
import { notFound } from "next/navigation";
import { getCategoryHref } from "@/lib/config/category-route";

type EditorialConfig = NonNullable<Awaited<ReturnType<typeof readEditorialConfig>>>;
type CompanyContent = Awaited<ReturnType<typeof getCompanyContent>>;

export async function EditorialPage({ slug }: { slug: string }) {
  const [config, content] = await Promise.all([readEditorialConfig(slug), getCompanyContent()]);
  if (!config) notFound();

  if (slug === "about-us") return <AboutPage config={config} content={content} />;
  if (slug === "company-insights" || slug === "our-excellence") return <StoryPage config={config} slug={slug} content={content} />;
  if (slug === "profile") return <ProfilePage config={config} content={content} />;
  if (slug === "quality") return <QualityPage config={config} content={content} />;
  if (slug === "awards") return <AwardsPage config={config} content={content} />;
  if (slug === "testimonial") return <TestimonialPage config={config} content={content} />;
  if (slug === "news") return <NewsPage config={config} content={content} />;
  if (slug === "corporate-video") return <VideoPage config={config} content={content} />;
  if (slug === "photos") return <PhotosPage config={config} />;
  if (slug === "jobs") return <JobsPage config={config} content={content} />;
  if (slug === "enquiry") return <ContactPage config={config} content={content} />;
  if (slug === "sitemap") return <SitemapPage config={config} />;
  return null;
}

function EditorialHero({ config, aside }: { config: EditorialConfig; aside?: ReactNode }) {
  return (
    <section className="editorial-hero">
      <Reveal className="mx-auto grid max-w-[1440px] gap-8 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:px-12 lg:py-28">
        <div><p className="eyebrow text-brand-red">{config.eyebrow}</p><h1 className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-7xl lg:text-8xl">{config.title}</h1><p className="mt-7 max-w-2xl text-base leading-7 text-ink/60 sm:text-lg sm:leading-8">{config.intro}</p></div>
        {aside && <div className="lg:justify-self-end">{aside}</div>}
      </Reveal>
    </section>
  );
}

function AboutPage({ config, content }: { config: EditorialConfig; content: CompanyContent }) {
  const { history, companyStory, company } = content;
  return <><EditorialHero config={config} aside={<SinceBadge />} /><section className="section-pad bg-white"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><SectionHeading eyebrow="From Sialkot to Meerut" title="A family story, across generations." description="The milestones below follow the history recorded in the BDM company profile." /><div className="history-list mt-12 lg:mt-16">{history.map((item,index)=><Reveal key={`${item.year}-${item.title}`} delay={index*70} className="history-row"><p className="history-year">{item.year}</p><div><h2 className="font-display text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">{item.title}</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-ink/60 sm:text-base">{item.detail}</p></div></Reveal>)}</div></div></section><StoryImageSection companyStory={companyStory} image={company.storyImage} /><ContentBand paragraphs={companyStory} /></>;
}

function StoryPage({ config, slug, content }: { config: EditorialConfig; slug: string; content: CompanyContent }) {
  const { companyStory, awards, company } = content;
  return <><EditorialHero config={config} aside={<SinceBadge />} /><section className="section-pad bg-white"><div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20 lg:px-12"><div><p className="eyebrow text-brand-red">{slug === "our-excellence" ? "How BDM has grown" : "The company today"}</p><p className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.05em]">A production and distribution network based in Meerut.</p><Link href="/profile" className="mt-7 inline-flex text-sm font-semibold text-brand-red">View company details ↗</Link></div><div className="space-y-6">{companyStory.map((paragraph,index)=><Reveal key={paragraph} delay={index*70}><p className="max-w-3xl text-base leading-8 text-ink/65">{paragraph}</p></Reveal>)}</div></div></section>{slug === "our-excellence" ? <AwardsStrip awards={awards} /> : <StoryImageSection companyStory={companyStory} image={company.storyImage} />}</>;
}

function ProfilePage({ config, content }: { config: EditorialConfig; content: CompanyContent }) {
  const { company, companyStory, awards } = content;
  const facts = [
    ["Company", company.legalName], ["Brand", company.brand], ["Based in", company.address],
    ["Established", String(company.founded)], ["GST identification number", company.gst], ["Product range", "Cricket bats, balls, protective equipment, and accessories"],
  ];
  return <><EditorialHero config={config} aside={<SinceBadge />} /><section className="section-pad bg-white"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><SectionHeading eyebrow="Company information" title="A clear picture of BDM." description="Facts and contact details shown in the BDM company profile." /><dl className="profile-grid mt-12">{facts.map(([term,value])=><div key={term} className="profile-fact"><dt>{term}</dt><dd>{value}</dd></div>)}</dl></div></section><ContentBand paragraphs={companyStory} /><AwardsStrip awards={awards} /></>;
}

function QualityPage({ config, content }: { config: EditorialConfig; content: CompanyContent }) {
  const { qualityNotes, awards } = content;
  return <><EditorialHero config={config} aside={<SinceBadge />} /><section className="section-pad bg-ink text-white"><div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12"><div><p className="eyebrow text-brand-red">The BDM approach</p><h2 className="mt-5 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl">Quality starts with the standards of the game.</h2></div><div className="space-y-0">{qualityNotes.map((note,index)=><div key={note} className="border-t border-white/20 py-6"><span className="text-xs font-bold text-brand-red">0{index+1}</span><p className="mt-3 max-w-2xl text-base leading-7 text-white/70">{note}</p></div>)}</div></div></section><AwardsStrip awards={awards} /></>;
}

function AwardsPage({ config, content }: { config: EditorialConfig; content: CompanyContent }) {
  const { awards } = content;
  return <><EditorialHero config={config} /><section className="section-pad bg-white"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="grid gap-6 md:grid-cols-2">{awards.map((award,index)=><Reveal key={award.title} delay={index*60} className="award-card"><div className="award-card-image"><Image src={award.image} alt={award.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div><div className="p-6 sm:p-8"><p className="eyebrow text-brand-red">{award.year}</p><h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.05em]">{award.title}</h2><p className="mt-3 text-sm leading-6 text-ink/60">{award.detail}</p></div></Reveal>)}</div></div></section></>;
}

function TestimonialPage({ config, content }: { config: EditorialConfig; content: CompanyContent }) {
  const { rating } = content;
  return <><EditorialHero config={config} aside={<div className="rating-score"><span>{rating.score}</span><small>/ 5</small><p>Reviewed by {rating.count} users</p></div>} /><section className="section-pad bg-white"><div className="mx-auto grid max-w-[1100px] gap-8 px-5 sm:px-8 md:grid-cols-[0.7fr_1.3fr] lg:px-12"><div><p className="eyebrow text-brand-red">Source-site rating</p><p className="mt-4 font-display text-6xl font-semibold tracking-[-0.08em]">{rating.score}<span className="text-2xl text-brand-red">/5</span></p><p className="mt-2 text-sm text-ink/55">{rating.count} user reviews</p></div><div className="space-y-4">{rating.distribution.map((row)=><div key={row.stars} className="grid grid-cols-[35px_1fr_45px] items-center gap-4 text-xs"><span>{row.stars} ★</span><span className="h-2 overflow-hidden rounded-full bg-ink/10"><span className="block h-full rounded-full bg-brand-red" style={{width:`${row.percent}%`}} /></span><span className="text-right text-ink/55">{row.percent}%</span></div>)}</div></div><p className="mx-auto mt-10 max-w-[1100px] px-5 text-xs leading-6 text-ink/40 sm:px-8 lg:px-12">The local website copy includes the rating summary but no individual review text, so no customer quotes are reproduced here.</p></section></>;
}

function NewsPage({ config, content }: { config: EditorialConfig; content: CompanyContent }) {
  const { newsNotice } = content;
  if (!newsNotice.isPublished) notFound();
  return <><EditorialHero config={config} /><section className="section-pad bg-white"><div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12"><article className="news-notice"><p className="eyebrow text-brand-red">Company notice · Source-site update</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">{newsNotice.title}</h2><p className="mt-5 text-base leading-7 text-ink/65">{newsNotice.body}</p><dl className="notice-details mt-8"><div><dt>Firm name</dt><dd>{newsNotice.accountName}</dd></div><div><dt>Bank</dt><dd>{newsNotice.bank}</dd></div><div><dt>Current account</dt><dd>{newsNotice.accountNumber}</dd></div><div><dt>IFSC</dt><dd>{newsNotice.ifsc}</dd></div><div><dt>Address in notice</dt><dd>{newsNotice.address}</dd></div><div><dt>Further clarification</dt><dd>{newsNotice.contactName} · <a href={`tel:${newsNotice.contactPhone}`}>{newsNotice.contactPhone}</a></dd></div></dl></article><p className="mt-5 text-xs leading-5 text-ink/45">This notice is reproduced from the supplied site content.</p></div></section></>;
}

function VideoPage({ config, content }: { config: EditorialConfig; content: CompanyContent }) {
  return <><EditorialHero config={config} /><section className="section-pad bg-ink"><div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12"><VideoFeature company={content.company} /><p className="mt-5 text-xs text-white/45">Video hosted on YouTube and linked from the original BDM Cricket site.</p></div></section></>;
}

async function PhotosPage({ config }: { config: EditorialConfig }) {
  const products = await getProducts();
  return <><EditorialHero config={config} /><section className="section-pad bg-white"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="photo-grid">{products.map((product,index)=><Link key={product.slug} href={`/products/${product.slug}`} className={`photo-tile photo-tile-${(index%5)+1}`}><Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-contain mix-blend-multiply transition-transform duration-700 hover:scale-105" /><span>{product.name}</span></Link>)}</div></div></section></>;
}

function JobsPage({ config, content }: { config: EditorialConfig; content: CompanyContent }) {
  const { company } = content;
  return <><EditorialHero config={config} /><section className="section-pad bg-ink text-white"><div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-12"><p className="eyebrow text-brand-red">Career enquiries</p><h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[-0.06em] sm:text-6xl">Bring your experience to a team built around cricket.</h2><p className="mt-6 max-w-2xl text-base leading-7 text-white/60">There are no specific open roles listed in the supplied site copy. For a career enquiry, contact BDM directly by phone.</p><a href={`tel:${company.phoneLink}`} className="mt-8 inline-flex rounded-full bg-white px-6 py-4 text-sm font-semibold text-ink">Call {company.phoneDisplay}</a></div></section></>;
}

function ContactPage({ config, content }: { config: EditorialConfig; content: CompanyContent }) {
  const { company } = content;
  return <><EditorialHero config={config} /><section className="section-pad bg-white"><div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:px-12"><div><p className="eyebrow text-brand-red">Get in touch</p><h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.06em]">Talk directly with BDM.</h2><p className="mt-5 text-sm leading-7 text-ink/60">For product, dealer, and company enquiries, call the number shown in the company profile.</p><a href={`tel:${company.phoneLink}`} className="mt-7 inline-flex min-h-14 items-center rounded-full bg-brand-red px-6 text-base font-semibold text-white transition-colors hover:bg-[#b91627]">Call {company.phoneDisplay}</a><div className="mt-8 flex flex-wrap gap-4"><ButtonLink href="/products" variant="outline">Browse products</ButtonLink><ButtonLink href="/about-us" variant="outline">About BDM</ButtonLink></div></div><div className="contact-card"><div className="contact-pin" aria-hidden="true">BDM<span>●</span></div><p className="eyebrow text-brand-red">Meerut, Uttar Pradesh</p><h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em]">{company.legalName}</h3><address className="mt-4 not-italic text-sm leading-7 text-ink/65">{company.address}</address><p className="mt-5 text-xs font-medium text-ink/45">GST No. {company.gst}</p><a className="mt-7 inline-flex text-sm font-semibold text-brand-red" href={`https://maps.google.com/?q=${company.coordinates}`} target="_blank" rel="noreferrer">Open directions in Google Maps ↗</a></div></div><div className="mx-auto mt-14 max-w-[900px] px-5 sm:px-8 lg:px-12"><ContactForm /></div></section></>;
}

async function SitemapPage({ config }: { config: EditorialConfig }) {
  const categories = await getCategories();
  const companyLinks = [{href:"/about-us",label:"About BDM"},{href:"/profile",label:"Company profile"},{href:"/company-insights",label:"Company insights"},{href:"/quality",label:"Quality"},{href:"/our-excellence",label:"Our excellence"},{href:"/awards",label:"Awards"},{href:"/testimonial",label:"Ratings & reviews"},{href:"/news",label:"News"},{href:"/corporate-video",label:"Corporate video"},{href:"/photos",label:"Photos"},{href:"/jobs",label:"Careers"},{href:"/enquiry",label:"Contact"}];
  return <><EditorialHero config={config} /><section className="section-pad bg-white"><div className="mx-auto grid max-w-[1200px] gap-12 px-5 sm:px-8 md:grid-cols-2 lg:px-12"><div><h2 className="eyebrow text-brand-red">Products</h2><ul className="sitemap-list mt-5">{categories.map((category)=><li key={category.slug}><Link href={getCategoryHref(category.slug)}>{category.name}<span>↗</span></Link><ul className="sitemap-subcategories">{category.subcategories.map((subcategory)=><li key={subcategory.slug}><Link href={`${getCategoryHref(category.slug)}#${subcategory.slug}`}>{subcategory.name}</Link></li>)}</ul></li>)}<li><Link href="/products">All products<span>↗</span></Link></li></ul></div><div><h2 className="eyebrow text-brand-red">Company</h2><ul className="sitemap-list mt-5">{companyLinks.map((item)=><li key={item.href}><Link href={item.href}>{item.label}<span>↗</span></Link></li>)}</ul></div></div></section></>;
}

function StoryImageSection({ companyStory, image }: { companyStory: string[]; image: string }) {
  return <section className="section-pad bg-[#e8e3d8]"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16 lg:px-12"><div className="relative aspect-[4/3] overflow-hidden bg-paper"><Image src={image} alt="BDM House of Cricket collage from the source company profile" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover mix-blend-multiply" /></div><div><p className="eyebrow text-brand-red">A history carried forward</p><p className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">The product range has grown. The family connection to cricket remains.</p><p className="mt-6 text-sm leading-7 text-ink/60">{companyStory[2]}</p><ButtonLink href="/products" variant="dark" className="mt-8">Explore the range</ButtonLink></div></div></section>;
}

function ContentBand({ paragraphs }: { paragraphs: string[] }) {
  return <section className="section-pad bg-ink text-white"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="eyebrow text-brand-red">From the company profile</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">A business shaped by steady, gradual growth.</h2></div><div className="space-y-6">{paragraphs.map((paragraph)=><p key={paragraph} className="max-w-3xl text-sm leading-7 text-white/65 sm:text-base">{paragraph}</p>)}</div></div></div></section>;
}

function AwardsStrip({ awards }: { awards: CompanyContent["awards"] }) {
  return <section className="section-pad bg-paper"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><SectionHeading eyebrow="Verified milestones" title="Recognition recorded by BDM." /><ButtonLink href="/awards" variant="outline">All awards</ButtonLink></div><div className="mt-10 grid gap-4 sm:grid-cols-3">{awards.slice(0,3).map((award)=><Link href="/awards" key={award.title} className="award-strip-card"><div className="relative aspect-[4/3] overflow-hidden bg-white"><Image src={award.image} alt={award.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" /></div><p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-red">{award.year}</p><h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.04em]">{award.title}</h3></Link>)}</div></div></section>;
}

function SinceBadge() {
  return <div className="since-badge"><span>BDM</span><small>House of Cricket</small><strong>1925</strong></div>;
}
