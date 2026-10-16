import { PracticeView } from '@/components/practice-view'
import { pageMeta, practices } from '@/lib/site'

const practice = practices.marketing

export const metadata = pageMeta(
  'Marketing, brand, and demand',
  practice.description,
  practice.letter.href
)

export default function Page() {
  return <PracticeView practice={practice} />
}
