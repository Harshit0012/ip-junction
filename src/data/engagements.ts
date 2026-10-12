export type Practice =
  | 'Network Strategy & Transformation'
  | 'Cloud & Infrastructure'
  | 'Digital Transformation'
  | 'Technology Research & Innovation'
  | 'Investment Advisory & Analysis';

export type Industry =
  | 'Telecom operators'
  | 'Cable operators'
  | 'Technology vendors'
  | 'Cloud & enterprise networks'
  | 'Private equity';

export interface Engagement {
  client: string;
  practice: Practice;
  industry: Industry;
  summary: string;
  /** Six words or fewer, for tiles and diagrams. */
  short: string;
}

// Source: "Representative Consulting Engagements" slide. Client names shown as text only, pending permission for logos.
export const ENGAGEMENTS: readonly Engagement[] = [
  {
    client: 'Verizon Communications',
    short: 'SDN/NFV 10-year TCO',
    practice: 'Network Strategy & Transformation',
    industry: 'Telecom operators',
    summary: 'SDN/NFV use case and TCO analysis covering wireless, wireline, core and OSS/BSS over 10 years.',
  },
  {
    client: 'SaskTel',
    short: 'LTE rollout without 700 MHz',
    practice: 'Network Strategy & Transformation',
    industry: 'Telecom operators',
    summary: 'LTE rollout strategy without 700 MHz spectrum, with gap analysis.',
  },
  {
    client: 'Cricket Wireless',
    short: 'Disaster recovery RFP response',
    practice: 'Network Strategy & Transformation',
    industry: 'Telecom operators',
    summary: 'RFP response on disaster recovery and business continuity strategy.',
  },
  {
    client: 'Frontier Communications',
    short: 'Broadband transformation, network lead',
    practice: 'Network Strategy & Transformation',
    industry: 'Telecom operators',
    summary: 'Network lead on a broadband transformation project.',
  },
  {
    client: 'Vesta Corporation',
    short: 'IP/MPLS data center audit',
    practice: 'Cloud & Infrastructure',
    industry: 'Cloud & enterprise networks',
    summary: 'IP/MPLS network audit for a distributed data center.',
  },
  {
    client: 'Cox Communications',
    short: 'IMS voice RFI',
    practice: 'Cloud & Infrastructure',
    industry: 'Cable operators',
    summary: 'RFI for voice transformation over IMS, built on PC2.0, 3GPP and IETF requirements.',
  },
  {
    client: 'Fujitsu Network Communications',
    short: 'Small-cell backhaul, C-RAN fronthaul',
    practice: 'Cloud & Infrastructure',
    industry: 'Technology vendors',
    summary: 'System solution consulting on small-cell backhaul and C-RAN fronthaul.',
  },
  {
    client: 'Charter Communications',
    short: '27-market migration plan',
    practice: 'Digital Transformation',
    industry: 'Cable operators',
    summary:
      'Program plan for migrating 27 markets (voice, data, video, mail and Wi-Fi, including subscriber cutover) ahead of the Comcast/TWC merger.',
  },
  {
    client: 'InterDigital Communications',
    short: 'Two bandwidth white papers',
    practice: 'Digital Transformation',
    industry: 'Technology vendors',
    summary: 'Two white papers on bandwidth management over cellular and Wi-Fi for home, enterprise and metro segments.',
  },
  {
    client: 'NEC America',
    short: 'Seven SDN and OpenFlow papers',
    practice: 'Technology Research & Innovation',
    industry: 'Technology vendors',
    summary: 'Seven white papers on SDN and OpenFlow.',
  },
  {
    client: 'SPO Partners',
    short: 'Spectrum holdings analysis',
    practice: 'Investment Advisory & Analysis',
    industry: 'Private equity',
    summary: 'Analysis of mobile network operator spectrum holdings.',
  },
];

export const PRACTICES: readonly { name: Practice; intro: string }[] = [
  {
    name: 'Network Strategy & Transformation',
    intro: 'Business cases, rollout strategy and transformation leadership for operator networks.',
  },
  {
    name: 'Cloud & Infrastructure',
    intro: 'Audits, procurement requirements and solution design for IP, transport and cloud platforms.',
  },
  {
    name: 'Digital Transformation',
    intro: 'Program plans and technical direction for large migrations and service change.',
  },
  {
    name: 'Technology Research & Innovation',
    intro: 'White papers and technical briefings that explain new architectures to the people buying them.',
  },
  {
    name: 'Investment Advisory & Analysis',
    intro: 'Technical diligence for investors evaluating spectrum, networks and the companies that run them.',
  },
];

export const byPractice = (p: Practice) => ENGAGEMENTS.filter((e) => e.practice === p);
export const byIndustry = (i: Industry) => ENGAGEMENTS.filter((e) => e.industry === i);
