import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const enquirySchema = z.object({
  fullName: z.string().trim().min(2).max(120), businessName: z.string().max(120).optional(), phone: z.string().trim().min(8).max(20), whatsapp: z.string().max(20).optional(), email: z.string().email().max(200), city: z.string().max(120).optional(), instagram: z.string().max(120).optional(), website: z.string().max(250).optional(), service: z.string().min(2).max(120), packageName: z.string().max(100).optional(), requirements: z.string().trim().min(10).max(5000), expectedStart: z.string().optional(), contactMethod: z.string().max(30).optional(), additionalRequirements: z.string().max(5000).optional(), budget: z.string().max(100).optional(), consent: z.literal(true),
});

export const submitEnquiry = createServerFn({ method: 'POST' }).inputValidator((value) => enquirySchema.parse(value)).handler(async ({ data }) => {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { error } = await supabaseAdmin.from('service_enquiries').insert({
    full_name: data.fullName, business_name: data.businessName || null, phone: data.phone, whatsapp: data.whatsapp || null, email: data.email, city: data.city || null, instagram: data.instagram || null, website: data.website || null, service: data.service, package_name: data.packageName || null, requirements: data.requirements, expected_start: data.expectedStart || null, contact_method: data.contactMethod || null, additional_requirements: data.additionalRequirements || null, budget: data.budget || null, consent: true, status: 'enquiry',
  });
  if (error) throw new Error('We could not send your enquiry. Please try again or contact us on WhatsApp.');
  return { success: true };
});
