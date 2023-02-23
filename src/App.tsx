// React
import { ChangeEvent, useState } from 'react'
// Components
import TimeBasedWrapper from './components/v1/TimeBasedWrapper'
import ComponentToRender from './components/ComponentToRender'
// Utils
import { getCurrentDateFromTime } from './utils/date'
// Style
import './App.css'

const App = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const setStartDateFromTime = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(getCurrentDateFromTime(event.target.value))
  }

  const setEndDateFromTime = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(getCurrentDateFromTime(event.target.value))
  }

  return (
    <div className='app-wrapper'>
      <p>Time-Based Component Rendering, choose your timing to render!</p>
      <div className='time-pickers-wrapper'>
        <div>
          <label htmlFor='start_time'>Start</label>
          <input id='start_time' type='time' onChange={setStartDateFromTime}></input>
        </div>
        <div>
          <label htmlFor='end_time'>End</label>
          <input id='end_time' type='time' onChange={setEndDateFromTime}></input>
        </div>
      </div>
      {startDate && endDate && (
        <TimeBasedWrapper startDate={startDate} endDate={endDate}>
          <ComponentToRender version='v1' />
        </TimeBasedWrapper>
      )}
    </div>
  )
}

export default App
