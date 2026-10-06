import type { APIRoute } from 'astro';
import { SITE, url } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const body = SITE.indexable
    ? `User-agent: *\nAllow: /\nDisallow: ${url('/admin/')}\n\nSitemap: ${new URL(url('/sitemap-index.xml'), site).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
