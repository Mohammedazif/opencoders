import { LaneView } from '@/components/lane-view'
import { laneBySlug, pageMeta } from '@/lib/site'

const lane = laneBySlug('teams')

export const metadata = pageMeta('Remote engineering teams', lane.description, lane.href)

export default function Page() {
  return <LaneView lane={lane} />
}
