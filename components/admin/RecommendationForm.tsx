'use client';

import { useState } from 'react';
import type { ProductRecommendation, AffiliateLink } from '@/lib/supabase/types';

const CATEGORIES = [
  'Hanteln & Gewichte',
  'Kurzhanteln',
  'Langhanteln',
  'Kettlebells',
  'Widerstandsbänder',
  'Matten & Böden',
  'Racks & Bänke',
  'Cardio',
  'Zubehör',
  'Sets & Pakete',
];

interface Props {
  action: (formData: FormData) => Promise<void>;
  initialData?: ProductRecommendation;
  affiliateLinks: Pick<AffiliateLink, 'id' | 'title' | 'slug'>[];
  submitLabel: string;
}

export default function RecommendationForm({ action, initialData, affiliateLinks, submitLabel }: Props) {
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setFormError('');
    try {
      const formData = new FormData(e.currentTarget);
      await action(formData);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
      setPending(false);
    }
  }

  const prosText = initialData?.pros?.join('\n') ?? '';
  const consText = initialData?.cons?.join('\n') ?? '';

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {formError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {formError}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          type="text"
          required
          defaultValue={initialData?.name ?? ''}
          placeholder="z. B. Verstellbare Kurzhanteln"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
      </div>

      {/* Kategorie */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kategorie</label>
        <select
          name="category"
          defaultValue={initialData?.category ?? ''}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          <option value="">– Keine –</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Kurzbeschreibung */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kurzbeschreibung</label>
        <textarea
          name="short_description"
          rows={2}
          defaultValue={initialData?.short_description ?? ''}
          placeholder="Neutrale Kurzbeschreibung des Produkttyps"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
        />
        <p className="text-xs text-gray-400 mt-1">Keine erfundenen Testergebnisse oder Marken</p>
      </div>

      {/* Pros & Cons */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vorteile (ein Punkt pro Zeile)
          </label>
          <textarea
            name="pros"
            rows={4}
            defaultValue={prosText}
            placeholder="Platzsparend&#10;Geeignet für Einsteiger&#10;Stufenlos verstellbar"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nachteile (ein Punkt pro Zeile)
          </label>
          <textarea
            name="cons"
            rows={4}
            defaultValue={consText}
            placeholder="Höherer Anschaffungspreis&#10;Nur für leichte Belastung"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
          />
        </div>
      </div>

      {/* Preishinweis */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Preishinweis</label>
        <input
          name="price_hint"
          type="text"
          defaultValue={initialData?.price_hint ?? ''}
          placeholder="z. B. ab ca. 50 € · Preise variieren"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
        <p className="text-xs text-gray-400 mt-1">Kein fixer Preis – Preise ändern sich. Neutrale Formulierung verwenden.</p>
      </div>

      {/* Bild-URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bild-URL (optional)</label>
        <input
          name="image_url"
          type="url"
          defaultValue={initialData?.image_url ?? ''}
          placeholder="https://..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
      </div>

      {/* Affiliate-Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Verknüpfter Affiliate-Link</label>
        <select
          name="affiliate_link_id"
          defaultValue={initialData?.affiliate_link_id ?? ''}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          <option value="">– Kein Link –</option>
          {affiliateLinks.map((link) => (
            <option key={link.id} value={link.id}>
              {link.title} (/go/{link.slug})
            </option>
          ))}
        </select>
      </div>

      {/* Position + Featured */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Position (Sortierung)</label>
          <input
            name="position"
            type="number"
            min="0"
            defaultValue={initialData?.position ?? 0}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>
        <div className="flex flex-col justify-end gap-3 pb-0.5">
          <div className="flex items-center gap-3">
            <input
              name="is_featured"
              type="checkbox"
              value="1"
              id="is_featured"
              defaultChecked={initialData?.is_featured ?? false}
              className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-400"
            />
            <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
              Als Featured markieren
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              name="is_active"
              type="checkbox"
              value="1"
              id="is_active"
              defaultChecked={initialData?.is_active ?? true}
              className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-400"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
              Aktiv
            </label>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
          {pending ? 'Speichern…' : submitLabel}
        </button>
        <a href="/admin/recommendations" className="btn-secondary">
          Abbrechen
        </a>
      </div>
    </form>
  );
}
