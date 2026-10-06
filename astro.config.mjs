import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Defaults target the GitHub Pages project URL; set SITE_URL and BASE_PATH=/ when moving to a custom domain.
const site = process.env.SITE_URL || 'https://harshit0012.github.io';
const base = process.env.BASE_PATH || '/ip-junction';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !/\/(404|contact\/thanks)\/?$/.test(page),
    }),
  ],
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://api.web3forms.com https://cloud.umami.is https://api-gateway.umami.dev https://app.cal.com",
        "frame-src https://app.cal.com https://cal.com",
        "form-action 'self' https://api.web3forms.com",
        "base-uri 'self'",
        "object-src 'none'",
      ],
      scriptDirective: {
        resources: ["'self'", 'https://app.cal.com', 'https://cloud.umami.is'],
      },
      styleDirective: {
        resources: [
          "'self'",
          'https://app.cal.com',
          // Cal.com's embed sets style attributes on the page; this allows attributes only, not <style> tags or scripts.
          { resource: "'unsafe-inline'", kind: 'attribute' },
        ],
      },
    },
  },
});
