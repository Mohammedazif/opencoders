export const siteName = 'OpenCoders'

export const tagline = 'The work, the reach, and the systems.'

export const summary =
  'OpenCoders is a content, marketing, and development company.'

export const oneSentence =
  'OpenCoders does the creative work, the reach, and the engineering — including AEC/BIM, software, AI, data, 3D, and remote technical teams.'

export const letters = [
  {
    letter: 'C',
    name: 'Content',
    href: '/content',
    color: '#00DCFF',
    beat: 'Create · Communicate · Engage',
  },
  {
    letter: 'M',
    name: 'Marketing',
    href: '/marketing',
    color: '#A78BFA',
    beat: 'Reach · Engage · Convert',
  },
  {
    letter: 'D',
    name: 'Development',
    href: '/development',
    color: '#34D399',
    beat: 'Build · Automate · Extend',
  },
] as const

export type Letter = (typeof letters)[number]
export type LetterMark = Letter['letter']
