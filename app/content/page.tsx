import { PracticeView } from '@/components/practice-view'
import { pageMeta, practices } from '@/lib/site'

const practice = practices.content

export const metadata = pageMeta(
  'Content for brands and technical products',
  practice.description,
  practice.letter.href
)

export default function Page() {
  return <PracticeView practice={practice} />
}
