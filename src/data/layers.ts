export type LayerId = 'radio' | 'transport' | 'core' | 'cloud' | 'oss';

export interface Layer {
  id: LayerId;
  name: string;
  line: string;
  tags: readonly string[];
  /** Engagement clients pinned to this layer. Mapping is editorial; each client's work is in engagements.ts. */
  pins: readonly { client: string; note: string }[];
}

export const LAYERS: readonly Layer[] = [
  {
    id: 'radio',
    name: 'Radio',
    line: 'Spectrum and the access edge.',
    tags: ['LTE strategy', 'Open RAN', 'O-Cloud', 'SMO'],
    pins: [
      { client: 'SPO Partners', note: 'spectrum analysis' },
    ],
  },
  {
    id: 'transport',
    name: 'Transport IP/MPLS',
    line: 'Where traffic is carried.',
    tags: ['IP/MPLS', 'Broadband', 'Backhaul', 'Fronthaul'],
    pins: [
      { client: 'Vesta', note: 'IP/MPLS audit' },
      { client: 'Fujitsu', note: 'backhaul and fronthaul' },
    ],
  },
  {
    id: 'core',
    name: 'Core',
    line: 'Voice, services, virtual functions.',
    tags: ['SDN/NFV', 'IMS', 'PC2.0', '3GPP', 'IETF'],
    pins: [
      { client: 'Verizon', note: 'SDN/NFV 10-year TCO' },
      { client: 'Charter', note: '27-market service migration' },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud and edge',
    line: 'Shared platforms and edge compute.',
    tags: ['OpenStack', 'Cloud-native platforms', 'Public & private cloud', 'Edge computing', 'Hyperscaler integration'],
    pins: [],
  },
  {
    id: 'oss',
    name: 'OSS/BSS',
    line: 'Systems that run the network.',
    tags: ['OSS/BSS', 'Orchestration', 'Network automation', 'AI/ML for networks'],
    pins: [],
  },
];
