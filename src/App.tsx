import TimeBasedWrapper from './components/v1/TimeBasedWrapper'
import ComponentToRender from './components/ComponentToRender'

const App = () => {
  return (
    <TimeBasedWrapper>
      <ComponentToRender version='v1' />
    </TimeBasedWrapper>
  )
}

export default App
