// React
import { useEffect, useState } from 'react'
// Models
import { TimeBasedRenderingProps as Props } from '../models/props'

const TimeBasedWrapper = ({ startDate, endDate, children }: Props) => {
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    const currentDate = new Date()
    let startRenderingTimeOut: NodeJS.Timeout | undefined = undefined
    let stopRenderingTimeOut: NodeJS.Timeout | undefined = undefined

    const shouldRenderNow = currentDate.getTime() >= startDate.getTime() && currentDate.getTime() <= endDate.getTime()

    if (shouldRenderNow) {
      // Start rendering
      setCanRender(true)

      // Set timeout to stop rendering at end date
      const isCurrentDateAheadOfStartDate = currentDate.getTime() > startDate.getTime()
      const renderingStartDate = isCurrentDateAheadOfStartDate ? currentDate.getTime() : startDate.getTime()
      const timeToStopRendering = endDate.getTime() - renderingStartDate
      stopRenderingTimeOut = setTimeout(() => setCanRender(false), timeToStopRendering)
    } else {
      // Stop rendering
      setCanRender(false)

      // Set timeouts to start rendering at start date and end rendering at end date
      const timeToStartRendering = startDate.getTime() - currentDate.getTime()
      const timeToStopRendering = endDate.getTime() - currentDate.getTime()
      startRenderingTimeOut = setTimeout(() => setCanRender(true), timeToStartRendering)
      stopRenderingTimeOut = setTimeout(() => setCanRender(false), timeToStopRendering)
    }

    return () => {
      clearTimeout(startRenderingTimeOut)
      clearTimeout(stopRenderingTimeOut)
    }
  }, [startDate, endDate])

  return <div>{canRender && children}</div>
}

export default TimeBasedWrapper
