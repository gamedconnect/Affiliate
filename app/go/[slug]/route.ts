import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const supabase = createAdminClient();

  const { data: link } = await supabase
    .from('affiliate_links')
    .select('id, affiliate_url, is_active')
    .eq('slug', params.slug)
    .single();

  if (!link || !link.is_active) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Fire-and-forget click tracking – never block the redirect
  const pageSlug = request.nextUrl.searchParams.get('from') ?? null;
  const referrer = request.headers.get('referer') ?? null;

  void supabase.from('affiliate_clicks').insert({
    affiliate_link_id: link.id,
    page_slug: pageSlug,
    referrer: referrer ? referrer.substring(0, 500) : null,
  });

  return NextResponse.redirect(link.affiliate_url, { status: 302 });
}
