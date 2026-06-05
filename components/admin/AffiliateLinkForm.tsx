'use client';

import { useState } from 'react';
import { slugify } from '@/lib/utils';
import type { AffiliateLink } from '@/lib/supabase/types';

const BUTTON_TEXT_OPTIONS = [
  'Zum aktuellen Preis',
  'Angebot ansehen',
  'Produkt ansehen',
  'Vergleich öffnen',
  'Jetzt kaufen',
];

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
  initialData?: AffiliateLink;
  submitLabel: string;
}

export default function AffiliateLinkForm({ action, initialData, submitLabel }: Props) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(!!initialData);
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState('');

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setTitle(val);
    if (!slugTouched) setSlug(slugify(val));
  }

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

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {formError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {formError}
        </div>
      )}

      {/* Titel */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Titel <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          type="text"
          required
          value={title}
          onChange={handleTitleChange}
          placeholder="z. B. Verstellbare Kurzhanteln 10-40 kg"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Slug <span className="text-red-500">*</span>
          <span className="text-xs text-gray-400 ml-1 font-normal">→ /go/{slug || '…'}</span>
        </label>
        <input
          name="slug"
          type="text"
          required
          value={slug}
          onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
          placeholder="verstellbare-kurzhanteln"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
      </div>

      {/* Affiliate-URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Affiliate-URL <span className="text-red-500">*</span>
        </label>
        <input
          name="affiliate_url"
          type="url"
          required
          defaultValue={initialData?.affiliate_url ?? ''}
          placeholder="https://www.beispiel.de/product?ref=..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
        <p className="text-xs text-gray-400 mt-1">Die eigentliche Affiliate-URL mit Tracking-Parameter</p>
      </div>

      {/* Ziel-URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ziel-URL (optional)
        </label>
        <input
          name="target_url"
          type="url"
          defaultValue={initialData?.target_url ?? ''}
          placeholder="https://www.beispiel.de/product (ohne Tracking)"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
        <p className="text-xs text-gray-400 mt-1">Produktseite ohne Tracking-Parameter (für interne Referenz)</p>
      </div>

      {/* Button-Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Button-Text</label>
        <select
          name="button_text"
          defaultValue={initialData?.button_text ?? 'Zum aktuellen Preis'}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          {BUTTON_TEXT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Merchant + Kategorie */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Händler / Merchant</label>
          <input
            name="merchant"
            type="text"
            defaultValue={initialData?.merchant ?? ''}
            placeholder="z. B. Amazon"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>
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
      </div>

      {/* Beschreibung */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung (intern)</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={initialData?.description ?? ''}
          placeholder="Interne Notizen zu diesem Link"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
        />
      </div>

      {/* Aktiv */}
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
          Link aktiv (für /go/[slug] erreichbar)
        </label>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="btn-primary disabled:opacity-60"
        >
          {pending ? 'Speichern…' : submitLabel}
        </button>
        <a href="/admin/affiliate-links" className="btn-secondary">
          Abbrechen
        </a>
      </div>
    </form>
  );
}
