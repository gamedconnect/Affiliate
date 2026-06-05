'use client';

import { useState, useCallback } from 'react';
import { marked } from 'marked';
import { slugify } from '@/lib/utils';
import type { AffiliateLink, ProductRecommendation } from '@/lib/supabase/types';

marked.use({ gfm: true, breaks: true });

const CATEGORIES = [
  'Home-Gym einrichten',
  'Geräte',
  'Training zuhause',
  'Kaufberatung',
  'Vergleiche',
  'FAQ',
];

type DbArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  tags: string[] | null;
  featured_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  author: string | null;
  affiliate_link_ids: string[] | null;
  product_recommendation_ids: string[] | null;
  is_published: boolean;
};

interface Props {
  action: (formData: FormData) => Promise<void>;
  initialData?: DbArticle;
  affiliateLinks: Pick<AffiliateLink, 'id' | 'title' | 'slug'>[];
  recommendations: Pick<ProductRecommendation, 'id' | 'name' | 'category'>[];
  submitLabel: string;
}

export default function ArticleEditor({
  action,
  initialData,
  affiliateLinks,
  recommendations,
  submitLabel,
}: Props) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(!!initialData);
  const [content, setContent] = useState(initialData?.content ?? '');
  const [previewMode, setPreviewMode] = useState(false);
  const [submitAction, setSubmitAction] = useState<'draft' | 'publish'>('draft');
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState('');

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setTitle(val);
    if (!slugTouched) setSlug(slugify(val));
  }

  // Insert markdown shortcut at cursor
  const insertMarkdown = useCallback(
    (before: string, after = '', placeholder = '') => {
      const ta = document.getElementById('md-editor') as HTMLTextAreaElement | null;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = content.slice(start, end) || placeholder;
      const newContent =
        content.slice(0, start) + before + selected + after + content.slice(end);
      setContent(newContent);
      ta.focus();
      const newPos = start + before.length + selected.length + after.length;
      requestAnimationFrame(() => {
        ta.setSelectionRange(newPos, newPos);
      });
    },
    [content]
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setFormError('');
    try {
      const fd = new FormData(e.currentTarget);
      await action(fd);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
      setPending(false);
    }
  }

  const previewHtml = previewMode
    ? (marked.parse(content, { async: false }) as string)
    : '';

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readMin = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      {formError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
          {formError}
        </div>
      )}

      {/* hidden submit_action field */}
      <input type="hidden" name="submit_action" value={submitAction} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── LEFT: Main Content ──────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Title */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titel <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="Artikeltitel eingeben…"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 text-lg"
            />
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-gray-400">Slug:</span>
              <input
                name="slug"
                type="text"
                required
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
                className="flex-1 border border-gray-200 rounded-lg px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-brand-400"
              />
              <span className="text-xs text-gray-400">→ /blog/{slug || '…'}</span>
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teaser / Excerpt
            </label>
            <textarea
              name="excerpt"
              rows={2}
              defaultValue={initialData?.excerpt ?? ''}
              placeholder="Kurze Zusammenfassung – erscheint in der Artikelübersicht und als Meta-Snippet"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
            />
          </div>

          {/* Markdown Editor */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2">
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-gray-500 mr-2">Inhalt</span>
                {[
                  { label: 'B', before: '**', after: '**', ph: 'Fett', title: 'Fett (Strg+B)' },
                  { label: 'I', before: '_', after: '_', ph: 'Kursiv', title: 'Kursiv' },
                  { label: 'H2', before: '\n## ', after: '', ph: 'Überschrift', title: 'H2' },
                  { label: 'H3', before: '\n### ', after: '', ph: 'Überschrift', title: 'H3' },
                  { label: '—', before: '\n\n---\n\n', after: '', ph: '', title: 'Trennlinie' },
                  { label: '• Liste', before: '\n- ', after: '', ph: 'Listenpunkt', title: 'Aufzählung' },
                  { label: '> Zitat', before: '\n> ', after: '', ph: 'Zitat', title: 'Blockzitat' },
                  { label: 'Link', before: '[', after: '](url)', ph: 'Link-Text', title: 'Hyperlink' },
                  { label: '/go/slug', before: '[Link-Text](/go/', after: ')', ph: 'slug', title: 'Affiliate-Redirect einfügen' },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    type="button"
                    title={btn.title}
                    onClick={() => insertMarkdown(btn.before, btn.after, btn.ph)}
                    className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors font-mono"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{wordCount} Wörter · ca. {readMin} Min.</span>
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                    previewMode
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {previewMode ? '✎ Bearbeiten' : '👁 Vorschau'}
                </button>
              </div>
            </div>

            {/* Editor / Preview */}
            {previewMode ? (
              <div
                className="markdown-content px-5 py-4 min-h-[500px] overflow-auto"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            ) : (
              <textarea
                id="md-editor"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Artikelinhalt in Markdown schreiben…\n\n## Überschrift\n\nHier Text eingeben. **Fett**, _kursiv_, [Link](url)\n\n- Aufzählungspunkt\n- Weiterer Punkt\n\nAffiliate-Links als: [Zum Produkt](/go/dein-slug)`}
                className="w-full min-h-[500px] px-5 py-4 text-sm font-mono focus:outline-none resize-y leading-relaxed"
                spellCheck
              />
            )}

            <div className="border-t border-gray-50 px-4 py-2 bg-gray-50/50">
              <p className="text-[11px] text-gray-400">
                Markdown wird unterstützt. Affiliate-Links einbinden mit:{' '}
                <code className="bg-gray-100 px-1 rounded">[Zum Produkt](/go/dein-slug)</code>
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Meta / Settings ──────────────────────── */}
        <div className="space-y-5">

          {/* Publish Controls */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Veröffentlichung</h3>
            <div className="space-y-2">
              <button
                type="submit"
                disabled={pending}
                onClick={() => setSubmitAction('draft')}
                className="btn-secondary w-full justify-center disabled:opacity-60"
              >
                {pending && submitAction === 'draft' ? 'Speichern…' : 'Als Entwurf speichern'}
              </button>
              <button
                type="submit"
                disabled={pending}
                onClick={() => setSubmitAction('publish')}
                className="btn-primary w-full justify-center disabled:opacity-60"
              >
                {pending && submitAction === 'publish' ? 'Veröffentlichen…' : '🚀 Veröffentlichen'}
              </button>
            </div>
            {initialData?.is_published && (
              <p className="mt-3 text-xs text-green-700 bg-green-50 rounded-lg px-3 py-2">
                ✓ Dieser Artikel ist veröffentlicht.
              </p>
            )}
          </div>

          {/* Category & Tags */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Kategorie & Tags</h3>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Kategorie</label>
              <select
                name="category"
                defaultValue={initialData?.category ?? ''}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              >
                <option value="">– Keine –</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Tags (kommagetrennt)
              </label>
              <input
                name="tags"
                type="text"
                defaultValue={initialData?.tags?.join(', ') ?? ''}
                placeholder="Hanteln, Einsteiger, Home-Gym"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Autor</label>
              <input
                name="author"
                type="text"
                defaultValue={initialData?.author ?? ''}
                placeholder="Redaktion"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Vorschaubild</h3>
            <input
              name="featured_image_url"
              type="url"
              defaultValue={initialData?.featured_image_url ?? ''}
              placeholder="https://…"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>

          {/* SEO */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">SEO</h3>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Meta-Titel <span className="text-gray-400">(leer = Artikeltitel)</span>
              </label>
              <input
                name="meta_title"
                type="text"
                defaultValue={initialData?.meta_title ?? ''}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Meta-Beschreibung <span className="text-gray-400">(leer = Excerpt)</span>
              </label>
              <textarea
                name="meta_description"
                rows={3}
                defaultValue={initialData?.meta_description ?? ''}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
              />
            </div>
          </div>

          {/* Affiliate Links */}
          {affiliateLinks.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Affiliate-Links</h3>
              <p className="text-xs text-gray-400 mb-3">
                Zuordnung für spätere Auswertung. Im Artikeltext via{' '}
                <code className="bg-gray-100 px-1 rounded">/go/slug</code> einbinden.
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {affiliateLinks.map((link) => (
                  <label key={link.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="affiliate_link_ids"
                      value={link.id}
                      defaultChecked={initialData?.affiliate_link_ids?.includes(link.id) ?? false}
                      className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-400"
                    />
                    <span className="text-xs text-gray-700">{link.title}</span>
                    <code className="text-[10px] text-gray-400">/go/{link.slug}</code>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Produktempfehlungen</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {recommendations.map((rec) => (
                  <label key={rec.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="product_recommendation_ids"
                      value={rec.id}
                      defaultChecked={
                        initialData?.product_recommendation_ids?.includes(rec.id) ?? false
                      }
                      className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-400"
                    />
                    <span className="text-xs text-gray-700">{rec.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Cancel */}
          <a href="/admin/articles" className="btn-secondary w-full justify-center">
            Abbrechen
          </a>
        </div>
      </div>
    </form>
  );
}
