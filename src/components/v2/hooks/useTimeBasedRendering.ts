import { useEffect, useState } from 'react'

export const useTimeBasedRendering = (incomingStartDate: Date, incomingEndDate: Date) => {
  const [startDate, setStartDate] = useState(incomingStartDate)
  const [endDate, setEndDate] = useState(incomingEndDate)
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    const currentDate = new Date()
    let startRenderingTimeOut: NodeJS.Timeout | undefined = undefined
    let stopRenderingTimeOut: NodeJS.Timeout | undefined = undefined
    let nextDayUpdateTimeOut: NodeJS.Timeout | undefined = undefined

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

    // Update the date (day) of the start and end dates so it would run everyday
    // Basically we have a timeout to launch after midnight by one second to update the day of the start and end dates
    const timeUntilMidnight = new Date(new Date().setHours(23, 59, 59, 59)).getTime() - new Date().getTime() + 1000
    nextDayUpdateTimeOut = setTimeout(() => {
      setStartDate(new Date(startDate.setDate(startDate.getDate() + 1)))
      setEndDate(new Date(endDate.setDate(endDate.getDate() + 1)))
    }, timeUntilMidnight)

    return () => {
      clearTimeout(startRenderingTimeOut)
      clearTimeout(stopRenderingTimeOut)
      clearTimeout(nextDayUpdateTimeOut)
    }
  }, [startDate, endDate])

  return canRender
}
