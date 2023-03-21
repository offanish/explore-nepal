import styled from 'styled-components'

const Wrapper = styled.main`
  display: flex;
  gap: 1.5rem;

  h1 {
    text-align: center;
    margin-top: 1rem;
  }
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
  .user-details-body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .user-details-body h3 {
    font-weight: 600;
  }
  .fa-user {
    border: 2px solid rgb(65, 65, 65);
    padding: 1.5rem;
    border-radius: 10%;
    font-size: 4rem;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .btn {
    padding: 10px 2rem;
    background-color: #3cb6d4;
  }
  .btn:hover {
    background-color: #3599b2;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    .container {
      grid-template-columns: 1fr;
    }
    .user-details-container {
      text-align: center;
    }
    .user-profile-heading {
      text-align: center;
    }
  }
  @media (max-width: 550px) {
    flex-direction: column;

    .container {
      grid-template-columns: 1fr;
    }
    .user-details-container {
      text-align: center;
    }
    .user-profile-heading {
      text-align: center;
    }
  }
`

export default Wrapper
