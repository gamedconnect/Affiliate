'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

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

function parseLines(value: string | null): string[] {
  if (!value) return [];
  return value
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

export async function createRecommendation(formData: FormData) {
  await assertAdmin();

  const name = (formData.get('name') as string).trim();
  const category = (formData.get('category') as string | null)?.trim() || null;
  const short_description = (formData.get('short_description') as string | null)?.trim() || null;
  const pros = parseLines(formData.get('pros') as string | null);
  const cons = parseLines(formData.get('cons') as string | null);
  const price_hint = (formData.get('price_hint') as string | null)?.trim() || null;
  const image_url = (formData.get('image_url') as string | null)?.trim() || null;
  const affiliate_link_id = (formData.get('affiliate_link_id') as string | null)?.trim() || null;
  const position = parseInt(formData.get('position') as string, 10) || 0;
  const is_featured = formData.get('is_featured') === '1';
  const is_active = formData.get('is_active') === '1';

  if (!name) throw new Error('Name ist ein Pflichtfeld');

  const admin = createAdminClient();
  const { error } = await admin.from('product_recommendations').insert({
    name, category, short_description, pros, cons, price_hint, image_url,
    affiliate_link_id: affiliate_link_id || null,
    position, is_featured, is_active,
  });

  if (error) throw new Error(error.message);

  revalidatePath('/admin/recommendations');
  redirect('/admin/recommendations');
}

export async function updateRecommendation(id: string, formData: FormData) {
  await assertAdmin();

  const name = (formData.get('name') as string).trim();
  const category = (formData.get('category') as string | null)?.trim() || null;
  const short_description = (formData.get('short_description') as string | null)?.trim() || null;
  const pros = parseLines(formData.get('pros') as string | null);
  const cons = parseLines(formData.get('cons') as string | null);
  const price_hint = (formData.get('price_hint') as string | null)?.trim() || null;
  const image_url = (formData.get('image_url') as string | null)?.trim() || null;
  const affiliate_link_id = (formData.get('affiliate_link_id') as string | null)?.trim() || null;
  const position = parseInt(formData.get('position') as string, 10) || 0;
  const is_featured = formData.get('is_featured') === '1';
  const is_active = formData.get('is_active') === '1';

  if (!name) throw new Error('Name ist ein Pflichtfeld');

  const admin = createAdminClient();
  const { error } = await admin
    .from('product_recommendations')
    .update({
      name, category, short_description, pros, cons, price_hint, image_url,
      affiliate_link_id: affiliate_link_id || null,
      position, is_featured, is_active,
    })
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/recommendations');
  redirect('/admin/recommendations');
}

export async function toggleRecommendation(id: string, is_active: boolean) {
  await assertAdmin();
  const admin = createAdminClient();
  const { error } = await admin
    .from('product_recommendations')
    .update({ is_active })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/recommendations');
}

export async function deleteRecommendation(id: string) {
  await assertAdmin();
  const admin = createAdminClient();
  const { error } = await admin.from('product_recommendations').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/recommendations');
}
