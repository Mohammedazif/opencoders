export const siteName = 'OpenCoders'

export const tagline = 'AEC software, content, marketing, and development'

export const summary =
  'OpenCoders is a software company. We make products for architecture, engineering, and construction teams, and our disciplines are content, marketing, and development.'

export const oneSentence =
  'We build software for architecture, engineering, and construction teams, and we help companies with content, marketing, and development.'

export const slogan = ['Think.', 'Create.', 'Reach.', 'Build.', 'Scale.']

/** Words each slogan slot types through on the homepage, starting with the slogan word itself. */
export const sloganAlternates = [
  ['Think.', 'Plan.', 'Imagine.'],
  ['Create.', 'Design.', 'Write.'],
  ['Reach.', 'Market.', 'Connect.'],
  ['Build.', 'Develop.', 'Automate.'],
  ['Scale.', 'Launch.', 'Grow.'],
]

export const letters = [
  {
    letter: 'C',
    name: 'Content',
    href: '/content',
    color: '#00DCFF',
    text: 'text-letter-c',
    bg: 'bg-letter-c',
    beat: 'Writing, design, video',
  },
  {
    letter: 'M',
    name: 'Marketing',
    href: '/marketing',
    color: '#A78BFA',
    text: 'text-letter-m',
    bg: 'bg-letter-m',
    beat: 'SEO, social, leads, PR',
  },
  {
    letter: 'D',
    name: 'Development',
    href: '/development',
    color: '#34D399',
    text: 'text-letter-d',
    bg: 'bg-letter-d',
    beat: 'BIM, software, AI, 3D',
  },
] as const

export type Letter = (typeof letters)[number]
export type LetterMark = Letter['letter']

export const primaryNav = [
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Disciplines' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/community', label: 'Community' },
]

export const cta = { href: '/start', label: 'Start a project' }
