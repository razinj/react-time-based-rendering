// Custom Hooks
import { useTimeBasedRendering } from './hooks/useTimeBasedRendering'
// Models
import { TimeBasedRenderingProps as Props } from '../models/props'

const TimeBasedWrapper = ({ startDate, endDate, children }: Props) => {
  const canRender = useTimeBasedRendering(startDate, endDate)

  return <div>{canRender && children}</div>
}

export default TimeBasedWrapper
