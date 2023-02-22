import { ReactNode, useEffect, useState } from 'react'

const startDate = new Date('2023-02-22T22:32:00Z')
const endDate = new Date('2023-02-22T22:40:00Z')

const TimeBasedWrapper = ({ children }: { children: ReactNode }) => {
  const [canDisplay, setCanDisplay] = useState(true)
  const [checkAgain, setCheckAgain] = useState(false)
  const [checkAgainAt, setCheckAgainAt] = useState<Date>(startDate)

  useEffect(() => {
    console.log('Whether or not to check again!')
    const nowTime = new Date().getTime()
    const timeoutTime = checkAgainAt.getTime() - nowTime

    if (timeoutTime < 0) {
      console.log('Will not check again, we should start, timeout time found: ', timeoutTime)
      return
    }

    console.log('Should check again in: ', timeoutTime)
    const timeout = setTimeout(() => setCheckAgain(true), timeoutTime)

    return () => {
      console.log('Clearing checkAgain timeout')
      clearTimeout(timeout)
    }
  }, [checkAgainAt])

  useEffect(() => {
    console.log('Whether or not to start displaying!')
    const nowTime = new Date().getTime()
    const shouldStartNow = nowTime >= startDate.getTime() && nowTime <= endDate.getTime()

    if (!shouldStartNow) {
      console.log('Not starting now.')
      setCanDisplay(false)
      setCheckAgainAt(startDate)
      return
    }

    setCanDisplay(true)

    const isNowAheadOfStartDate = nowTime >= startDate.getTime()
    const timeoutTime = endDate.getTime() - (isNowAheadOfStartDate ? nowTime : startDate.getTime())

    console.log('Displaying until: ', timeoutTime)
    const timeout = setTimeout(() => setCanDisplay(false), timeoutTime)

    return () => {
      console.log('Clearing canDisplay timeout')
      clearTimeout(timeout)
    }
  }, [checkAgain])

  return <div>{canDisplay && children}</div>
}

export default TimeBasedWrapper
