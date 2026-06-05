export interface AffiliateBox {
  title: string;
  description: string;
  linkText: string;
  href: string;
  disclaimer?: string;
}

export interface ArticleSection {
  heading: string;
  content: string;
  tips?: string[];
  affiliate?: AffiliateBox;
  adPlaceholder?: boolean;
  recommendations?: ProductRecommendation[];
}

export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  categorySlug: string;
  date: string;
  readTime: number;
  featured: boolean;
  excerpt: string;
  intro: string;
  sections: ArticleSection[];
  conclusion: string;
  tags: string[];
}

export interface ProductRecommendation {
  badge: string;
  productType: string;
  benefit: string;
  targetAudience: string;
  linkText?: string;
  href?: string;
  highlight?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  color: string;
}
