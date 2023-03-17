import styled from 'styled-components'

const Wrapper = styled.footer`
  width: 100%;
  height: 15vh;
  display: grid;
  place-items: center;
  padding: 1rem 15%;
  background-color: #28c697;
  color: white;
  text-align: center;
  @media (max-width: 1000px) {
    padding: 1rem 2%;
  }
  @media (max-width: 550px) {
    padding: 0.5rem 5%;
  }
`

export default Wrapper
