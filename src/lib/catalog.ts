export const phone = '+918388810468';
export const whatsapp = (message = "Hi Saiyam, I found JAINSAIYAM and I'm interested in your services. I'd like to discuss my requirements.") => `https://wa.me/918388810468?text=${encodeURIComponent(message)}`;
export const services = [
  { name: 'Website Development & Designing', short: 'Custom business websites, landing pages and a professional online presence.', icon: 'Monitor' },
  { name: 'Social Media Management', short: 'Consistent short-form content creation and social media management.', icon: 'Clapperboard' },
  { name: 'Meta Ads', short: 'Paid campaigns designed to reach relevant audiences and generate enquiries.', icon: 'Megaphone' },
  { name: 'Branding', short: 'Professional visual identity, branding systems and creative assets.', icon: 'Shapes' },
  { name: 'Chatbots & Automations', short: 'Lead capture systems, chatbots and business automation workflows.', icon: 'Bot' },
  { name: 'Google Business Profile Optimization', short: 'Improve your local presence and visibility on Google.', icon: 'MapPin' },
  { name: 'Influencer Marketing', short: 'Creator discovery, campaign planning and marketing execution.', icon: 'Users' },
];
export type Package = { name: string; price: number | null; features: string[]; popular?: boolean; sub?: string };
export const websitePackages: Package[] = [
  { name: 'Starter', price: 4999, features: ['Free subdomain', 'Custom-designed website', '3 pages: Home, About, Contact', '6 revisions', 'Mobile optimized', '1–2 days delivery'] },
  { name: 'Business', price: 9999, popular: true, features: ['1 year .com / .in domain', 'Fully customized website', '5–6 pages', '10 revisions', '1 month free service', 'Branding', 'SEO setup', 'Custom-made videos in website', '4–7 days delivery'] },
  { name: 'Advanced', price: 14999, features: ['1 year .com / .in domain', 'Fully customized website', 'Unlimited pages', 'Unlimited revisions', '2 months free service', 'Branding', 'SEO', 'Custom-made videos', '7–10 days delivery'] },
];
export const socialPackages: Package[] = [
  { name: 'Starter', price: 4999, features: ['Instagram + Facebook Reels', '14 short-form content pieces/month', 'Basic editing', '1 revision per content piece', 'Basic branding', '1–45 seconds per content'] },
  { name: 'Business', price: 6999, popular: true, features: ['Instagram + Facebook Reels', 'YouTube Shorts', '21 short-form content pieces/month', 'MOFU-level editing', 'Unlimited revisions per content piece', 'Advanced branding', '1–120 seconds per content'] },
  { name: 'Advanced', price: 11111, features: ['Instagram + Facebook Reels', 'YouTube Shorts', '30 short-form content pieces/month', 'MOFU-level editing', 'Unlimited revisions per content piece', 'Advanced branding', '1–120 seconds per content'] },
];
export const growthPackages: Package[] = [
  { name: 'Starter', price: null, sub: 'For businesses building their digital foundation', features: ['Starter Website', 'Starter Social Media Management', 'Basic Branding', 'Free Automation Tools', 'Basic Google Business Profile Optimization', 'Additional services available on demand'] },
  { name: 'Growth', price: null, popular: true, sub: 'For businesses ready to scale their online presence', features: ['Business Website', 'Business Social Media Management', 'Premium Branding', 'Chatbots', 'Advanced Google Business Profile Optimization', 'Meta Ads', 'Additional services available on demand'] },
  { name: 'Dominate', price: null, sub: 'For businesses looking for a complete digital growth system', features: ['Advanced Website', 'Advanced Social Media Management', 'Premium Branding', 'Automations & Chatbots', 'Advanced Google Business Profile Optimization', 'Meta Ads', '5–7 Meta ad campaigns per month', 'Additional services available on demand'] },
];
export const packageFor = (service: string, name: string) => (service === 'Website Development' ? websitePackages : service === 'Social Media Management' ? socialPackages : service === 'Business Growth Package' ? growthPackages : []).find((p) => p.name === name);
