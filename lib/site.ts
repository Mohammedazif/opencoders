import type { Metadata } from 'next'
import { letters, oneSentence, siteName, tagline, type Letter } from '@/lib/nav'
import { products } from '@/lib/products'
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
    lede: 'BIM software, Revit and CAD plugins, IFC workflows, and digital twins.',
    description:
      'We build software for architecture, engineering, and construction firms: BIM tools, Revit and AutoCAD plugins, IFC and OpenBIM workflows, and digital twins.',
    groups: [
      {
        title: 'BIM software',
        body: 'Web and desktop tools for viewing, checking, and sharing building models.',
      },
      {
        title: 'Revit and CAD plugins',
        body: 'Add-ins that automate checks, exports, sheets, and data entry.',
      },
      {
        title: 'OpenBIM and IFC',
        body: 'Reading, converting, and exchanging IFC models between tools.',
      },
      {
        title: 'Model automation',
        body: 'Scripts and rules that check and clean up models in bulk.',
      },
      {
        title: 'Digital twins',
        body: 'Building models connected to live sensor and asset data.',
      },
    ],
    questions: [
      {
        q: 'Which tools do you work with?',
        a: 'Revit, AutoCAD, Navisworks, Dynamo, IFC, and web 3D viewers.',
      },
      {
        q: 'Who is this for?',
        a: 'Architecture, engineering, and construction firms, and companies building software for them.',
      },
      {
        q: 'Can you add AI to our BIM data?',
        a: 'Yes. We can build search, assistants, and checks on top of your models and drawings.',
      },
    ],
  },
  {
    slug: 'software',
    href: '/development/software',
    title: 'Custom software',
    lede: 'Web apps, mobile apps, backends, APIs, and integrations.',
    description:
      'We build web and mobile applications, backends, APIs, and integrations between the tools your business already uses.',
    groups: [
      {
        title: 'Web applications',
        body: 'SaaS products, dashboards, client portals, and internal tools.',
      },
      {
        title: 'Mobile apps',
        body: 'iOS and Android apps, including field apps for site teams.',
      },
      {
        title: 'Backend and APIs',
        body: 'Databases, authentication, APIs, and cloud hosting.',
      },
      {
        title: 'Integrations',
        body: 'Connecting your systems so data moves between them automatically.',
      },
    ],
    questions: [
      {
        q: 'What technology do you use?',
        a: 'Mostly TypeScript, React, Next.js, Node.js, Python, and .NET, chosen to fit the project.',
      },
      {
        q: 'Do you maintain the software after launch?',
        a: 'Yes. We offer ongoing support and further development after release.',
      },
    ],
  },
  {
    slug: 'ai-data',
    href: '/development/ai-data',
    title: 'AI and data',
    lede: 'AI assistants, document processing, computer vision, and data pipelines.',
    description:
      'We build AI assistants, document search, computer vision, and data pipelines, including AI for BIM and construction data.',
    groups: [
      {
        title: 'AI assistants',
        body: 'Chat assistants that answer from your own documents and data.',
      },
      {
        title: 'Document processing',
        body: 'Extracting data from PDFs, drawings, invoices, and forms.',
      },
      {
        title: 'Computer vision',
        body: 'Detecting and measuring objects in photos, video, and scans.',
      },
      {
        title: 'Data engineering',
        body: 'Pipelines that collect, clean, and move data between systems.',
      },
      {
        title: 'Dashboards',
        body: 'Reports and live dashboards for the numbers you track.',
      },
    ],
    questions: [
      {
        q: 'Will our data stay private?',
        a: 'Yes. We can run models in your own cloud account so your data does not leave it.',
      },
      {
        q: 'Do you train custom models?',
        a: 'Only when needed. Most projects use existing models connected to your documents and data.',
      },
    ],
  },
  {
    slug: '3d',
    href: '/development/3d',
    title: '3D and real-time',
    lede: 'Web 3D, Unreal Engine, configurators, and simulations.',
    description:
      'We build interactive 3D for the web and Unreal Engine: product configurators, building walkthroughs, and simulations.',
    groups: [
      {
        title: 'Web 3D',
        body: '3D viewers and experiences that run in the browser.',
      },
      {
        title: 'Unreal Engine',
        body: 'Real-time walkthroughs and interactive environments.',
      },
      {
        title: 'Configurators',
        body: 'Let customers change and preview a product or space in 3D.',
      },
      {
        title: 'Simulation',
        body: 'Visual simulations of buildings, equipment, and processes.',
      },
    ],
    questions: [
      {
        q: 'Where does the 3D run?',
        a: 'In the browser, as a desktop app built with Unreal Engine, or on large screens and VR headsets.',
      },
      {
        q: 'Can you use our BIM or CAD models?',
        a: 'Yes. We can import IFC, Revit, and CAD models and optimise them for real-time use.',
      },
    ],
  },
  {
    slug: 'teams',
    href: '/development/teams',
    title: 'Engineering teams',
    lede: 'Remote developers who join your team, short or long term.',
    description:
      'Hire remote software, BIM, AI, and 3D developers who work inside your team, on your tools and your schedule.',
    groups: [
      {
        title: 'Roles',
        body: 'Software, web, mobile, backend, BIM, AI, and 3D developers.',
      },
      {
        title: 'Dedicated team',
        body: 'A full team that works only on your product.',
      },
      {
        title: 'Team extension',
        body: 'One or more developers added to your in-house team.',
      },
      {
        title: 'Project team',
        body: 'A team put together for a single project with a fixed scope.',
      },
    ],
    questions: [
      {
        q: 'Which roles can you provide?',
        a: 'Software, web, mobile, backend, BIM, AI, and 3D developers.',
      },
      {
        q: 'Do they work in our time zone?',
        a: 'We agree on overlapping working hours so the team can join your meetings.',
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
    promise: 'Writing, design, and video.',
    description:
      'We write, design, and film the material your company needs: social posts, brand graphics, product videos, and technical articles.',
    groups: [
      {
        title: 'Writing',
        body: 'Website copy, blog posts, social posts, and newsletters.',
      },
      {
        title: 'Graphic design',
        body: 'Brand graphics, social visuals, presentations, and brochures.',
      },
      {
        title: 'Video',
        body: 'Product videos, explainers, and motion graphics.',
      },
      {
        title: 'Brand identity',
        body: 'Logos, colours, typefaces, and brand guidelines.',
      },
      {
        title: 'Technical writing',
        body: 'Documentation, case studies, and articles for AEC and tech audiences.',
      },
      {
        title: 'Social content',
        body: 'Posts, carousels, and short copy made for the channels a company already runs.',
      },
    ],
    questions: [
      {
        q: 'Do you write for technical industries?',
        a: 'Yes. We write for AEC, BIM, and software audiences, and our engineers review the technical details.',
      },
      {
        q: 'Can you also publish and promote it?',
        a: 'Yes. Our marketing team can run the channels and campaigns for the content we make.',
      },
    ],
    continues: [marketingLetter, developmentLetter],
  },
  marketing: {
    id: 'marketing',
    letter: marketingLetter,
    promise: 'SEO, social media, leads, and PR.',
    description:
      'We help companies get found and win customers through SEO, social media, paid ads, lead generation, and PR.',
    groups: [
      {
        title: 'SEO',
        body: 'Keyword research, on-page fixes, and content that ranks.',
      },
      {
        title: 'Social media',
        body: 'Planning, posting, and paid campaigns on LinkedIn, Instagram, and more.',
      },
      {
        title: 'Lead generation',
        body: 'B2B outreach, landing pages, and email campaigns.',
      },
      {
        title: 'PR',
        body: 'Press releases, media contacts, and company announcements.',
      },
      {
        title: 'Brand strategy',
        body: 'Positioning, messaging, and who you are selling to.',
      },
      {
        title: 'Go-to-market',
        body: 'Launch plans for new products and for what the company sells.',
      },
    ],
    questions: [
      {
        q: 'How do you report results?',
        a: 'Regular reports on traffic, leads, and spend, with the next steps we recommend.',
      },
      {
        q: 'Do you work with B2B companies?',
        a: 'Yes, especially companies in AEC and technology.',
      },
    ],
    continues: [contentLetter, developmentLetter],
  },
  development: {
    id: 'development',
    letter: developmentLetter,
    promise: 'BIM, software, AI, and 3D.',
    description:
      'We build BIM and AEC software, custom web and mobile apps, AI tools, and 3D experiences, and we provide remote engineering teams.',
    groups: lanes.map((lane) => ({
      title: lane.title,
      body: lane.lede,
      href: lane.href,
    })),
    questions: [
      {
        q: 'Do you take fixed-price projects?',
        a: 'Yes, when the scope is clear. Otherwise we work in monthly sprints.',
      },
      {
        q: 'Project or team?',
        a: 'A project delivers a finished product. A team works with you for as long as you need.',
      },
    ],
    continues: [contentLetter, marketingLetter],
  },
}

export const approaches = [
  {
    id: 'people',
    title: 'Join the community',
    body: 'Meet other people working in tech, design, marketing, and AEC.',
    href: '/community',
    cta: 'Community',
  },
  {
    id: 'customers',
    title: 'Content and marketing',
    body: 'Writing, design, video, SEO, social, and leads.',
    href: '/content',
    cta: 'Content',
    secondaryHref: '/marketing',
    secondaryCta: 'Marketing',
  },
  {
    id: 'build',
    title: 'Build software',
    body: 'BIM tools, web and mobile apps, AI, and 3D.',
    href: '/development',
    cta: 'Development',
  },
  {
    id: 'all',
    title: 'Hire developers',
    body: 'Remote engineers who join your team.',
    href: '/development/teams',
    cta: 'Teams',
  },
] as const

export const audience = [
  {
    title: 'Professionals',
    body: 'People working in tech, design, marketing, and construction.',
  },
  {
    title: 'Learners',
    body: 'Practitioners building depth in software, BIM, design, or marketing.',
  },
  {
    title: 'Developers and BIM specialists',
    body: 'Technical talks, code reviews, and open-source projects.',
  },
  {
    title: 'Designers and creators',
    body: 'Design, video, and brand work.',
  },
  {
    title: 'Marketers',
    body: 'SEO, social media, and lead generation.',
  },
  {
    title: 'Partners',
    body: 'Companies and freelancers who want to work with us.',
  },
] as const

export const aboutParagraph =
  'OpenCoders is a software company. We build our own products for architecture, engineering, and construction teams: OpenTwin, OpenDesk, OpenLand, and plugins for Revit and AutoCAD. We also work for clients in three areas. Content covers writing, design, and video. Marketing covers SEO, social media, leads, and PR. Development covers BIM software, web and mobile apps, AI, 3D, and remote engineering teams. We work remotely.'

export const facts = [
  ['Company', siteName],
  ['What we do', 'AEC software products, plus content, marketing, and development.'],
  ['Products', products.map((product) => product.name).join(', ')],
  ['Content', 'Writing, design, video, brand identity, and technical writing.'],
  ['Marketing', 'SEO, social media, lead generation, PR, and brand strategy.'],
  ['Development', 'BIM and AEC software, web and mobile apps, AI and data, 3D, and remote teams.'],
  ['Industries', 'Architecture, engineering, construction, and technology.'],
  ['Location', 'Remote. We work with clients worldwide.'],
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
      'Revit plugins',
      'Digital twins',
    ],
  }
}

export function allPaths() {
  return [
    '/',
    '/services',
    '/products',
    ...products.map((product) => `/products/${product.slug}`),
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
