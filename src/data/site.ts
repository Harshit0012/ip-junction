const env = import.meta.env;

export const SITE = {
  name: 'IPJunction',
  legalName: 'IPJunction Inc.',
  tagline: 'Strategy. Technology. Results.',
  description:
    'Boutique technology consulting for telecom, cable, mobile, cloud and next-generation networks. Strategic advisory and execution since 2009.',
  foundingYear: 2009,
  email: 'deepak.kataria@ip-junction.com',
  phone: '+1 908 419 3320',
  phoneDisplay: '908 419 3320',
  address: {
    street: '101 Crawfords Corner Road, Suite 4116',
    city: 'Holmdel',
    region: 'NJ',
    postalCode: '07733',
    country: 'US',
  },
  founder: { name: 'Deepak Kataria', role: 'Founder & Managing Director' },
  calLink: env.PUBLIC_CAL_LINK || '',
  web3formsKey: env.PUBLIC_WEB3FORMS_KEY || '',
  umamiId: env.PUBLIC_UMAMI_ID || '',
  indexable: env.PUBLIC_INDEXABLE === 'true',
} as const;

export const CITY_LINE = `${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`;

export const PRIMARY_CTA = { label: 'Book a call', href: '/contact/#book' } as const;

export const NAV = [
  { label: 'Expertise', href: '/platform/' },
  { label: 'Approach', href: '/approach/' },
  { label: 'Offerings', href: '/offerings/' },
  { label: 'Engagements', href: '/pricing/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'About', href: '/about/' },
] as const;

export const FOOTER_GROUPS = [
  {
    title: 'Firm',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Careers', href: '/careers/' },
      { label: 'Partner with us', href: '/partners/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  {
    title: 'Work',
    links: [
      { label: 'Offerings', href: '/offerings/' },
      { label: 'Industries', href: '/industries/' },
      { label: 'Ecosystem', href: '/ecosystem/' },
      { label: 'Insights', href: '/insights/' },
    ],
  },
  {
    title: 'Site',
    links: [
      { label: 'Trust', href: '/trust/' },
      { label: 'Updates', href: '/changelog/' },
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Terms', href: '/terms/' },
    ],
  },
] as const;

/** Prefix an internal path with the configured base (GitHub Pages project path). */
export function url(path: string): string {
  const base = env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
