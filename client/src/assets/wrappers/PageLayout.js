import styled from 'styled-components';

const Wrapper = styled.main`
  padding: 2rem 15%;
  @media (max-width: 1000px) {
    padding: 1rem 2%;
  }
  @media (max-width: 550px) {
    padding: 0.5rem 5%;
  }
`;

export default Wrapper;
