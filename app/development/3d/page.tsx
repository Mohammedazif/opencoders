import { LaneView } from '@/components/lane-view'
import { laneBySlug, pageMeta } from '@/lib/site'

const lane = laneBySlug('3d')

export const metadata = pageMeta('3D and real-time', lane.description, lane.href)

export default function Page() {
  return <LaneView lane={lane} />
}
