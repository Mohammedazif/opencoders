import type { Metadata } from 'next'
import { letters, oneSentence, siteName, summary, tagline, type Letter } from '@/lib/nav'
import { getSiteUrl } from '@/lib/url'

const [contentLetter, marketingLetter, developmentLetter] = letters

export type Group = {
  title: string
  body: string
  href?: string
}

export type Question = {
  q: string
  a: string
}

export type WorkPiece = {
  slug: string
  title: string
  field: string
  letters: Array<'C' | 'M' | 'D'>
  summary: string
  before: string
  made: string
  changed: string
}

export const work: WorkPiece[] = []

export type Lane = {
  slug: string
  href: string
  title: string
  lede: string
  description: string
  groups: Group[]
  questions: Question[]
}

export const lanes: Lane[] = [
  {
    slug: 'aec-bim',
    href: '/development/aec-bim',
    title: 'AEC / BIM',
    lede:
      'BIM and AEC software, OpenBIM and IFC, model automation, and digital twins.',
    description:
      'OpenCoders builds BIM and AEC software, IFC and OpenBIM workflows, model automation, and digital twins.',
    groups: [
      {
        title: 'BIM software',
        body: 'Applications, platforms, workflow tools, data tools, and collaboration around the model.',
      },
      {
        title: 'AEC software',
        body: 'Tools for architecture, engineering, and construction, shaped around how that work actually moves.',
      },
      {
        title: 'Automation',
        body: 'Model processing, extraction, transformation, rule-based checks, and the steps people repeat.',
      },
      {
        title: 'OpenBIM and IFC',
        body: 'IFC processing, model exchange, interoperability, and turning model data into something other systems can use.',
      },
      {
        title: 'Digital twins',
        body: 'Asset views, live building data, and an operational picture of a place that already exists.',
      },
    ],
    questions: [
      {
        q: 'What does AEC / BIM development cover?',
        a: 'BIM and AEC applications, OpenBIM and IFC pipelines, automation on models, and digital twins fed by building data.',
      },
      {
        q: 'Who is it for?',
        a: 'Firms and product teams in architecture, engineering, and construction that need software around their models.',
      },
      {
        q: 'Can this sit next to AI or a custom app?',
        a: 'Yes. AI on BIM data, and custom software around the same project, are separate lanes in Development. One conversation covers both.',
      },
    ],
  },
  {
    slug: 'software',
    href: '/development/software',
    title: 'Custom software',
    lede: 'Web and mobile applications, backends, APIs, and integrations.',
    description:
      'OpenCoders builds custom web apps, mobile and field apps, backends, APIs, and integrations.',
    groups: [
      {
        title: 'Web applications',
        body: 'Business apps, SaaS products, dashboards, client portals, and internal systems.',
      },
      {
        title: 'Mobile',
        body: 'Field applications and other tools people carry while the work is happening.',
      },
      {
        title: 'Backend',
        body: 'APIs, databases, authentication, and the architecture underneath the screens.',
      },
      {
        title: 'Integrations',
        body: 'Third-party systems, data sync, and workflow automation between tools you already run.',
      },
    ],
    questions: [
      {
        q: 'What kind of software do you build?',
        a: 'Web applications, mobile and field apps, backends and APIs, and integrations with the systems a company already uses.',
      },
      {
        q: 'Is this the same as the AEC work?',
        a: 'It is the same Development practice, different lane. AEC / BIM is for model and building workflows. This lane is for the business systems around them or apart from them.',
      },
    ],
  },
  {
    slug: 'ai-data',
    href: '/development/ai-data',
    title: 'AI and data',
    lede:
      'Assistants, retrieval, vision, document processing, pipelines, and AI on BIM data.',
    description:
      'OpenCoders builds AI assistants, RAG, vision, document processing, data pipelines, and AI for BIM.',
    groups: [
      {
        title: 'AI applications',
        body: 'Assistants, automation, retrieval-augmented generation, computer vision, and intelligent document processing.',
      },
      {
        title: 'AI and BIM',
        body: 'The same AI methods pointed at models, drawings, and project data.',
      },
      {
        title: 'Data engineering',
        body: 'Processing, extraction, integration, pipelines, and the management of the data itself.',
      },
      {
        title: 'Analytics',
        body: 'Reads on what the data is doing, including streams that have to stay current.',
      },
    ],
    questions: [
      {
        q: 'What does the AI work include?',
        a: 'Assistants, retrieval over your own material, vision, document processing, and workflows that use those pieces. AI on BIM data is part of this lane.',
      },
      {
        q: 'Do you train a new model for every project?',
        a: 'Most work starts from the documents and data you already have, retrieved and checked, rather than a model trained from scratch.',
      },
    ],
  },
  {
    slug: '3d',
    href: '/development/3d',
    title: '3D and real-time',
    lede:
      'Interactive 3D, web 3D, Unreal, simulation, and digital-twin experiences.',
    description:
      'OpenCoders builds interactive 3D, web 3D, Unreal environments, simulation, and digital-twin experiences.',
    groups: [
      {
        title: 'Interactive 3D',
        body: 'Applications, web 3D, spatial views, and 3D that explains data instead of only decorating it.',
      },
      {
        title: 'Real-time',
        body: 'Unreal Engine work, interactive environments, and simulation.',
      },
      {
        title: 'Twin experiences',
        body: 'A building or asset, in a form someone can inspect, with live or project data attached.',
      },
    ],
    questions: [
      {
        q: 'Where does the 3D run?',
        a: 'In the browser as web 3D, in Unreal Engine, or as an experience that shares data with a BIM or digital-twin pipeline.',
      },
      {
        q: 'How is this different from a rendering service?',
        a: 'The work is interactive software: a person moves, asks, or watches live data. A still image is a content job.',
      },
    ],
  },
  {
    slug: 'teams',
    href: '/development/teams',
    title: 'Engineering teams',
    lede:
      'Remote engineers working as part of a client’s group, on a project or a long engagement.',
    description:
      'OpenCoders provides remote engineering teams — software, BIM, AI, 3D, web, mobile, and backend — dedicated, extended, or project-based.',
    groups: [
      {
        title: 'Who can be on a team',
        body: 'Software engineers, BIM and AEC developers, AI engineers, 3D developers, web, mobile, backend, and other technical specialists.',
      },
      {
        title: 'How they sit',
        body: 'A dedicated team, an extended team beside an in-house group, or a team assembled for one project.',
      },
      {
        title: 'How long',
        body: 'A defined build, or a long engagement that stays after the first release.',
      },
      {
        title: 'Where the work happens',
        body: 'Remote, as part of the client’s engineering group.',
      },
    ],
    questions: [
      {
        q: 'What is an extended team?',
        a: 'Engineers who work as part of your group, on your stack and in your rhythm, rather than a separate project handed back at the end.',
      },
      {
        q: 'Which skills can a team include?',
        a: 'Software, BIM and AEC development, AI, 3D, web, mobile, and backend. The mix follows the work.',
      },
      {
        q: 'Where do the teams work?',
        a: 'Remote, as part of the client’s group.',
      },
    ],
  },
]

export type PracticeId = 'content' | 'marketing' | 'development'

export type Practice = {
  id: PracticeId
  letter: Letter
  promise: string
  description: string
  groups: Group[]
  questions: Question[]
  continues: Letter[]
}

export const practices: Record<PracticeId, Practice> = {
  content: {
    id: 'content',
    letter: contentLetter,
    promise: 'Story, design, video, and technical explanation.',
    description:
      'Content at OpenCoders is the story, the design, the video, and the technical explanation a customer can understand.',
    groups: [
      {
        title: 'Creation',
        body: 'Social, campaign, product, educational, and promotional material, written for a specific customer.',
      },
      {
        title: 'Design',
        body: 'Brand graphics, campaign visuals, presentations, collateral, and the digital pieces around them.',
      },
      {
        title: 'Video',
        body: 'Promotional, product, and explainer films, short and long, including motion graphics.',
      },
      {
        title: 'Brand story',
        body: 'Creative direction, visual communication, and the concept a campaign is built on.',
      },
      {
        title: 'Technical explanation',
        body: 'Articles, product documentation, educational material, and industry writing that a specialist will finish.',
      },
    ],
    questions: [
      {
        q: 'What does Content make?',
        a: 'Story, design, video, brand work, and technical explanation, including for AEC and other specialist subjects.',
      },
      {
        q: 'Does it include Marketing?',
        a: 'Content makes the material. Marketing carries it. Both are OpenCoders.',
      },
    ],
    continues: [marketingLetter, developmentLetter],
  },
  marketing: {
    id: 'marketing',
    letter: marketingLetter,
    promise: 'Search, social, leads, PR, and brand.',
    description:
      'Marketing at OpenCoders covers digital and social, search, leads, PR, brand, and the strategy that ties them together.',
    groups: [
      {
        title: 'Digital and social',
        body: 'Strategy, campaign management, audience targeting, and the channels the customer already uses.',
      },
      {
        title: 'Search',
        body: 'SEO, visibility, keyword strategy, and pages written so the right search can land on them.',
      },
      {
        title: 'Leads',
        body: 'B2B and campaign leads, from first acquisition through nurturing and a cleaner conversion.',
      },
      {
        title: 'PR and reputation',
        body: 'Media relations, corporate communication, press, and the way the company is described in public.',
      },
      {
        title: 'Brand',
        body: 'Strategy, identity, positioning, and the message people should repeat.',
      },
      {
        title: 'Strategy',
        body: 'Go-to-market, audience, growth planning, and a read on whether the work did what it was for.',
      },
    ],
    questions: [
      {
        q: 'What does Marketing cover?',
        a: 'Digital and social, search, leads, PR, brand, and strategy.',
      },
      {
        q: 'Does it include Content?',
        a: 'Yes. Content makes the material. Marketing carries it. One company.',
      },
    ],
    continues: [contentLetter, developmentLetter],
  },
  development: {
    id: 'development',
    letter: developmentLetter,
    promise: 'AEC/BIM, software, AI, data, 3D, and teams that stay.',
    description:
      'Development at OpenCoders covers AEC/BIM, custom software, AI and data, 3D and real-time, and remote engineering teams.',
    groups: lanes.map((lane) => ({
      title: lane.title,
      body: lane.lede,
      href: lane.href,
    })),
    questions: [
      {
        q: 'What does Development build?',
        a: 'AEC and BIM software, custom systems, AI and data, 3D and real-time work, and remote engineering teams.',
      },
      {
        q: 'Project or team?',
        a: 'A project delivers the system. A team stays with the client. Both are Development.',
      },
      {
        q: 'With Content and Marketing?',
        a: 'Yes. One company.',
      },
    ],
    continues: [contentLetter, marketingLetter],
  },
}

export const approaches = [
  {
    id: 'people',
    title: 'Community',
    body: 'Professionals, learners, creators, and partners around the work.',
    href: '/community',
    cta: 'Community',
  },
  {
    id: 'customers',
    title: 'Content and Marketing',
    body: 'The material, and the reach.',
    href: '/content',
    cta: 'Content',
    secondaryHref: '/marketing',
    secondaryCta: 'Marketing',
  },
  {
    id: 'build',
    title: 'Development',
    body: 'AEC/BIM, software, AI, data, and 3D.',
    href: '/development',
    cta: 'Development',
  },
  {
    id: 'all',
    title: 'Teams, or all three',
    body: 'A team that stays, or more than one letter. One company.',
    href: '/development/teams',
    cta: 'Teams',
  },
] as const

export const audience = [
  {
    title: 'Industry professionals',
    body: 'People already doing the work, comparing notes across content, marketing, and development.',
  },
  {
    title: 'Learners',
    body: 'People who want to see how the three letters fit together, including in AEC and technical fields.',
  },
  {
    title: 'Developers and AEC people',
    body: 'Technical discussion, BIM and software practice, and open-source participation.',
  },
  {
    title: 'Designers and creators',
    body: 'Visual work, video, and brand story.',
  },
  {
    title: 'Marketers',
    body: 'Search, social, brand, leads, and the strategy around them.',
  },
  {
    title: 'Contributors and partners',
    body: 'Collaboration, introductions, and industry conversations.',
  },
] as const

export const aboutParagraph =
  'OpenCoders is one company with three ways in: Content, Marketing, and Development. Content makes the story, the visuals, the video, and the technical explanation. Marketing gets that work in front of the right people and turns attention into demand. Development builds the systems: AEC/BIM and OpenBIM, custom software, AI and data, 3D and real-time, and engineering teams that stay with a client. The company is remote-first, and it keeps a community of people who do this work.'

export const facts = [
  ['Name', siteName],
  ['Line', tagline],
  ['What it is', summary],
  [
    'Content',
    'Creative work, design, video, brand story, and technical explanation.',
  ],
  [
    'Marketing',
    'Digital and social, search, leads, PR, brand, and strategy.',
  ],
  [
    'Development',
    'AEC/BIM, custom software, AI and data, 3D and real-time, and remote engineering teams.',
  ],
  ['How it operates', 'Remote-first. Distributed. No dependency on one office.'],
  [
    'Who it is for',
    'Companies that need the work, the reach, the systems, or a team that stays. People around that work.',
  ],
] as const

export function pageMeta(
  title: string,
  description: string,
  path: string
): Metadata {
  const full = `${title} · ${siteName}`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      url: path,
      siteName,
      type: 'website',
    },
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteName,
    description: oneSentence,
    url: getSiteUrl(),
    slogan: tagline,
    knowsAbout: [
      'Content creation',
      'Marketing',
      'Software development',
      'AEC',
      'BIM',
      'OpenBIM',
      'IFC',
      'Artificial intelligence',
      '3D visualization',
    ],
  }
}

export function allPaths() {
  return [
    '/',
    ...Object.values(practices).map((practice) => practice.letter.href),
    ...lanes.map((lane) => lane.href),
    '/work',
    ...work.map((piece) => `/work/${piece.slug}`),
    '/about',
    '/community',
    '/start',
  ]
}

export function laneBySlug(slug: string) {
  const lane = lanes.find((item) => item.slug === slug)
  if (!lane) throw new Error(`Unknown lane: ${slug}`)
  return lane
}
