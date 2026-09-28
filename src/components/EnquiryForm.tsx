import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { submitEnquiry } from '@/lib/enquiries.functions';
import { services, websitePackages, socialPackages, growthPackages, packageFor, whatsapp } from '@/lib/catalog';

const inputClass = 'w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15';
const labelClass = 'mb-2 block text-xs font-semibold uppercase text-muted-foreground';
export function EnquiryForm({ initialService = '', initialPackage = '', contact = false }: { initialService?: string; initialPackage?: string; contact?: boolean }) {
  const [service, setService] = useState(initialService);
  const [selectedPackage, setSelectedPackage] = useState(initialPackage);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');
  const packages = service === 'Website Development' ? websitePackages : service === 'Social Media Management' ? socialPackages : service === 'Business Growth Package' ? growthPackages : [];
  const choice = packageFor(service, selectedPackage);
  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = new FormData(event.currentTarget);
    setStatus('sending');
    try {
      await submitEnquiry({ data: {
        fullName: String(form.get('fullName') || ''), businessName: String(form.get('businessName') || ''), phone: String(form.get('phone') || ''), whatsapp: String(form.get('whatsapp') || ''), email: String(form.get('email') || ''), city: String(form.get('city') || ''), instagram: String(form.get('instagram') || ''), website: String(form.get('website') || ''), service, packageName: selectedPackage, requirements: String(form.get('requirements') || ''), expectedStart: String(form.get('expectedStart') || ''), contactMethod: String(form.get('contactMethod') || ''), additionalRequirements: String(form.get('additionalRequirements') || ''), budget: String(form.get('budget') || ''), consent: form.get('consent') === 'on' ? true : undefined as never,
      } });
      setStatus('success');
    } catch (err) {
      setErrorText(err instanceof Error ? err.message : 'Please try again.');
      setStatus('error');
    }
  }
  if (status === 'success') return <div className="py-12 text-center"><span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary"><Check /></span><h2 className="font-display text-3xl font-bold">Thanks! Your enquiry has been received.</h2><p className="mt-3 text-muted-foreground">I’ll get back to you soon.</p><Button variant="brand" asChild className="mt-7"><a href={whatsapp()} target="_blank" rel="noreferrer"><MessageCircle /> Chat on WhatsApp</a></Button></div>;
  return <form onSubmit={send} className="space-y-7">
    <div className="grid gap-5 sm:grid-cols-2">
      {([['fullName','Full name *','text',true],['businessName','Business name','text',false],['phone','Phone number *','tel',true],['whatsapp','WhatsApp number','tel',false],['email','Email *','email',true],['city','City','text',false],['instagram','Instagram handle','text',false],['website','Website URL, if available','url',false]] as const).map(([key,label,type,required]) => <label key={key}><span className={labelClass}>{label}</span><input className={inputClass} name={key} type={type} required={required} placeholder={label.replace(' *','')} /></label>)}
    </div>
    <div className="grid gap-5 sm:grid-cols-2"><label><span className={labelClass}>Service required *</span><select required className={inputClass} value={service} onChange={(e) => { setService(e.target.value); setSelectedPackage(''); }}><option value="">Select a service</option>{services.map((item) => <option key={item.name} value={item.name === 'Website Development & Designing' ? 'Website Development' : item.name}>{item.name}</option>)}<option value="Business Growth Package">Business Growth Package</option></select></label><label><span className={labelClass}>Package</span><select className={inputClass} value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)}><option value="">{packages.length ? 'Select a package' : 'Custom Quote — Let’s Discuss'}</option>{packages.map((p) => <option key={p.name} value={p.name}>{p.name} {p.price ? `— ₹${p.price.toLocaleString('en-IN')}${service === 'Social Media Management' ? '/month' : ''}` : '— Custom Pricing'}</option>)}</select></label></div>
    {contact && <label className="block"><span className={labelClass}>Budget</span><input name="budget" className={inputClass} placeholder="Your approximate budget" /></label>}
    <label className="block"><span className={labelClass}>Tell us about your project *</span><textarea required minLength={10} rows={5} className={inputClass} name="requirements" placeholder="Tell us about your business, what you want to achieve, and what kind of service you need." /></label>
    <div className="grid gap-5 sm:grid-cols-2"><label><span className={labelClass}>Expected start date</span><input type="date" name="expectedStart" className={inputClass} /></label><label><span className={labelClass}>Preferred contact method</span><select name="contactMethod" className={inputClass}><option value="">Select one</option><option>WhatsApp</option><option>Phone</option><option>Email</option></select></label></div>
    <label className="block"><span className={labelClass}>Additional requirements</span><textarea rows={3} name="additionalRequirements" className={inputClass} placeholder="Anything else we should know?" /></label>
    {choice && <div className="border-t border-border pt-6"><p className="text-xs font-bold uppercase text-primary">Your order</p><div className="mt-4 flex items-start justify-between gap-4"><div><strong className="block text-lg">{service} · {choice.name}</strong><span className="text-sm text-muted-foreground">{service === 'Website Development' ? 'One-time package price' : 'Recurring monthly service'}</span></div><strong className="shrink-0 text-xl">{choice.price ? `₹${choice.price.toLocaleString('en-IN')}` : 'Custom Pricing'}</strong></div><p className="mt-3 text-xs text-muted-foreground">Applicable taxes or fees, if any, will be confirmed before payment. No payment will be taken when you send this enquiry.</p></div>}
    <label className="flex items-start gap-3 text-sm text-muted-foreground"><input required type="checkbox" name="consent" className="mt-1 accent-primary" /><span>I agree to be contacted regarding my enquiry.</span></label>
    {status === 'error' && <p role="alert" className="text-sm text-destructive">{errorText}</p>}
    <Button type="submit" variant="brand" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto">{status === 'sending' ? 'Sending…' : 'Send Enquiry'} <ArrowRight /></Button>
  </form>;
}
