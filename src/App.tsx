import { SpaceLogo } from './SpaceLogo'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`

function App() {


  return (
    <Wrapper>
      <SpaceLogo />
    </Wrapper>
  )
}

export default App
