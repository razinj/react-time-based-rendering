import { ReactNode } from 'react'

export type TimeBasedRenderingProps = {
  children: ReactNode
  startDate: Date
  endDate: Date
}
