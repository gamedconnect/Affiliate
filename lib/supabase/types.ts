export interface AffiliateLink {
  id: string;
  title: string;
  slug: string;
  merchant: string | null;
  category: string | null;
  description: string | null;
  target_url: string | null;
  affiliate_url: string;
  button_text: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductRecommendation {
  id: string;
  name: string;
  category: string | null;
  short_description: string | null;
  pros: string[] | null;
  cons: string[] | null;
  price_hint: string | null;
  image_url: string | null;
  affiliate_link_id: string | null;
  position: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  affiliate_links?: AffiliateLink;
}

export interface AffiliateClick {
  id: string;
  affiliate_link_id: string | null;
  clicked_at: string;
  page_slug: string | null;
  referrer: string | null;
}

export interface Profile {
  id: string;
  role: 'user' | 'admin';
  created_at: string;
}
