import styled from 'styled-components';

const Wrapper = styled.main`
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
  @media (max-width: 700px) {
    .container {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 550px) {
    .container {
      grid-template-columns: 1fr;
    }
  }
`;
export default Wrapper;
