'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { slugify } from '@/lib/utils';

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

function parseTagList(raw: string | null): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

function parseUuidList(values: string[]): string[] {
  return values.filter((v) => v && v.trim().length > 0);
}

function buildArticlePayload(formData: FormData, isPublish: boolean, existingPublishedAt?: string | null) {
  const title = (formData.get('title') as string).trim();
  const rawSlug = (formData.get('slug') as string).trim();
  const slug = rawSlug || slugify(title);

  const excerpt = (formData.get('excerpt') as string | null)?.trim() || null;
  const content = (formData.get('content') as string | null) ?? '';
  const category = (formData.get('category') as string | null)?.trim() || null;
  const tags = parseTagList(formData.get('tags') as string | null);
  const featured_image_url = (formData.get('featured_image_url') as string | null)?.trim() || null;
  const meta_title = (formData.get('meta_title') as string | null)?.trim() || null;
  const meta_description = (formData.get('meta_description') as string | null)?.trim() || null;
  const author = (formData.get('author') as string | null)?.trim() || null;
  const affiliate_link_ids = parseUuidList(formData.getAll('affiliate_link_ids') as string[]);
  const product_recommendation_ids = parseUuidList(formData.getAll('product_recommendation_ids') as string[]);

  const is_published = isPublish;
  let published_at: string | null = null;
  if (isPublish) {
    published_at = existingPublishedAt || new Date().toISOString();
  }

  if (!title) throw new Error('Titel ist ein Pflichtfeld');
  if (!slug) throw new Error('Slug konnte nicht generiert werden');

  return {
    title, slug, excerpt, content, category, tags,
    featured_image_url, meta_title, meta_description, author,
    affiliate_link_ids, product_recommendation_ids,
    is_published, published_at,
  };
}

export async function createArticle(formData: FormData) {
  await assertAdmin();

  const submitAction = formData.get('submit_action') as string;
  const isPublish = submitAction === 'publish';
  const payload = buildArticlePayload(formData, isPublish);

  const admin = createAdminClient();
  const { error } = await admin.from('articles').insert(payload);
  if (error) throw new Error(error.message);

  revalidatePath('/admin/articles');
  revalidatePath('/blog');
  redirect('/admin/articles');
}

export async function updateArticle(id: string, formData: FormData) {
  await assertAdmin();

  // fetch existing to preserve published_at
  const admin = createAdminClient();
  const { data: existing } = await admin
    .from('articles')
    .select('published_at')
    .eq('id', id)
    .single();

  const submitAction = formData.get('submit_action') as string;
  const isPublish = submitAction === 'publish';
  const payload = buildArticlePayload(formData, isPublish, existing?.published_at);

  const { error } = await admin
    .from('articles')
    .update(payload)
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/articles');
  revalidatePath('/blog');
  revalidatePath(`/blog/${payload.slug}`);
  redirect('/admin/articles');
}

export async function deleteArticle(id: string) {
  await assertAdmin();
  const admin = createAdminClient();
  const { error } = await admin.from('articles').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/articles');
  revalidatePath('/blog');
}

export async function publishArticle(id: string) {
  await assertAdmin();
  const admin = createAdminClient();

  // Only set published_at once
  const { data: current } = await admin
    .from('articles')
    .select('published_at')
    .eq('id', id)
    .single();

  const { error } = await admin
    .from('articles')
    .update({
      is_published: true,
      published_at: current?.published_at || new Date().toISOString(),
    })
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/admin/articles');
  revalidatePath('/blog');
}

export async function unpublishArticle(id: string) {
  await assertAdmin();
  const admin = createAdminClient();
  const { error } = await admin
    .from('articles')
    .update({ is_published: false })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/articles');
  revalidatePath('/blog');
}
