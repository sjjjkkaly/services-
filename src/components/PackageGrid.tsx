import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Package, whatsapp } from '@/lib/catalog';
export function PackageGrid({ items, service, monthly = false }: {items: Package[]; service: string; monthly?: boolean}) {
  return <div className="grid items-stretch gap-5 lg:grid-cols-3">{items.map((item) => <article key={item.name} className={`relative flex flex-col rounded-lg border p-7 md:p-8 ${item.popular ? 'border-primary bg-card shadow-popular' : 'border-border bg-card'}`}>
    {item.popular && <div className="absolute right-6 top-0 -translate-y-1/2 rounded-sm bg-primary px-3 py-1 text-[10px] font-extrabold uppercase text-primary-foreground">Most Popular</div>}
    <div className="mb-7"><p className="text-xs font-bold uppercase text-primary">{item.name}</p>{item.sub && <p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">{item.sub}</p>}<div className="mt-5 flex items-end gap-1"><span className="font-display text-4xl font-bold">{item.price ? `₹${item.price.toLocaleString('en-IN')}` : 'Custom Pricing'}</span>{item.price && monthly && <span className="pb-1 text-sm text-muted-foreground">/ month</span>}</div><p className="mt-2 text-xs text-muted-foreground">{monthly ? 'Monthly service package' : item.price ? 'One-time package price' : 'Let’s discuss your business requirements.'}</p></div>
    <div className="mb-8 h-px bg-border"/><ul className="mb-8 flex-1 space-y-3">{item.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-sm leading-6"><Check className="mt-1 size-4 shrink-0 text-primary"/><span>{feature}</span></li>)}</ul>
    <Button variant={item.popular ? 'brand' : 'outline'} size="lg" asChild className="w-full"><Link to="/contact" search={{ service, package: item.name }}>{item.price ? `Choose ${item.name}` : 'Get Started'} <ArrowUpRight /></Link></Button>
    <a href={whatsapp(`Hi Saiyam, I'm interested in the ${item.name} ${service} package${item.price ? ` priced at ₹${item.price.toLocaleString('en-IN')}${monthly ? '/month' : ''}` : ''}. I'd like to discuss my requirements.`)} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary"><MessageCircle className="size-3" /> Discuss on WhatsApp</a>
  </article>)}</div>;
}
