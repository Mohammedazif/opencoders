import { LaneView } from '@/components/lane-view'
import { laneBySlug, pageMeta } from '@/lib/site'

const lane = laneBySlug('aec-bim')

export const metadata = pageMeta(lane.title, lane.description, lane.href)

export default function Page() {
  return <LaneView lane={lane} />
}
