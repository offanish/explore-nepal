import styled from 'styled-components'

const Wrapper = styled.main`
  display: flex;

  .user-details-container {
    flex: 1;
  }
  .user-places-container {
    flex: 3;
  }
  .user-profile-heading {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    .container {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 550px) {
    flex-direction: column;

    .container {
      grid-template-columns: 1fr;
    }
  }
`

export default Wrapper
