'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

async function assertAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Nicht authentifiziert');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') throw new Error('Kein Admin-Zugriff');
}

export async function createAffiliateLink(formData: FormData) {
  await assertAdmin();

  const title = (formData.get('title') as string).trim();
  const slug = (formData.get('slug') as string).trim();
  const affiliate_url = (formData.get('affiliate_url') as string).trim();
  const target_url = (formData.get('target_url') as string | null)?.trim() || null;
  const button_text = (formData.get('button_text') as string).trim() || 'Zum aktuellen Preis';
  const merchant = (formData.get('merchant') as string | null)?.trim() || null;
  const category = (formData.get('category') as string | null)?.trim() || null;
  const description = (formData.get('description') as string | null)?.trim() || null;
  const is_active = formData.get('is_active') === '1';

  if (!title || !slug) throw new Error('Titel und Slug sind Pflichtfelder');
  if (!isValidUrl(affiliate_url)) throw new Error('Ungültige Affiliate-URL');
  if (target_url && !isValidUrl(target_url)) throw new Error('Ungültige Ziel-URL');

  const admin = createAdminClient();
  const { error } = await admin.from('affiliate_links').insert({
    title, slug, merchant, category, description,
    target_url, affiliate_url, button_text, is_active,
  });

  if (error) throw new Error(error.message);

  revalidatePath('/admin/affiliate-links');
  redirect('/admin/affiliate-links');
}

export async function updateAffiliateLink(id: string, formData: FormData) {
  await assertAdmin();

  const title = (formData.get('title') as string).trim();
  const slug = (formData.get('slug') as string).trim();
  const affiliate_url = (formData.get('affiliate_url') as string).trim();
  const target_url = (formData.get('target_url') as string | null)?.trim() || null;
  const button_text = (formData.get('button_text') as string).trim() || 'Zum aktuellen Preis';
  const merchant = (formData.get('merchant') as string | null)?.trim() || null;
  const category = (formData.get('category') as string | null)?.trim() || null;
  const description = (formData.get('description') as string | null)?.trim() || null;
  const is_active = formData.get('is_active') === '1';

  if (!title || !slug) throw new Error('Titel und Slug sind Pflichtfelder');
  if (!isValidUrl(affiliate_url)) throw new Error('Ungültige Affiliate-URL');
  if (target_url && !isValidUrl(target_url)) throw new Error('Ungültige Ziel-URL');

  const admin = createAdminClient();
  const { error } = await admin
    .from('affiliate_links')
    .update({ title, slug, merchant, category, description, target_url, affiliate_url, button_text, is_active })
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/affiliate-links');
  redirect('/admin/affiliate-links');
}

export async function toggleAffiliateLink(id: string, is_active: boolean) {
  await assertAdmin();
  const admin = createAdminClient();
  const { error } = await admin
    .from('affiliate_links')
    .update({ is_active })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/affiliate-links');
}

export async function deleteAffiliateLink(id: string) {
  await assertAdmin();
  const admin = createAdminClient();
  const { error } = await admin.from('affiliate_links').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/affiliate-links');
}
