import { PracticeView } from '@/components/practice-view'
import { pageMeta, practices } from '@/lib/site'

const practice = practices.development

export const metadata = pageMeta(
  'Development for AEC, software, AI, and 3D',
  practice.description,
  practice.letter.href
)

export default function Page() {
  return <PracticeView practice={practice} />
}
