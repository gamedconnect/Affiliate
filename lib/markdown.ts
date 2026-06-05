import { marked } from 'marked';

marked.use({
  gfm: true,
  breaks: true,
});

export function renderMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string;
}

export function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
