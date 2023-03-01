// React
import { ReactNode } from 'react'

export type TimeBasedRenderingProps = {
  children: ReactNode
  startDate: Date
  endDate: Date
}

export type TimeBasedRenderingV1Props = {
  children: ReactNode
  incomingStartDate: Date
  incomingEndDate: Date
}
