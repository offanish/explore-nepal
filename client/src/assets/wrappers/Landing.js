import styled from 'styled-components'
import image from '../images/landing.jpg'

const Wrapper = styled.main`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${image});
  background-size: cover;
  background-position: top right;
  height: 100vh;
  color: white;

  .container {
    padding-left: 10%;
    padding-top: 10%;

    .introduction {
      margin: 2rem 0 2rem;
      color: #d5d5d5;
      line-height: 1.4;
      width: 50%;
    }
    h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    .buttons {
      width: 40%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .btn-continue {
      grid-column: span 2;
    }
    .view-button {
      margin-top: 2rem;
    }
  }
  @media (max-width: 600px) {
    text-align: center;
    .container {
      padding: 10% 5%;
      .introduction {
        width: 100%;
        line-height: 1.2;
        font-size: 0.8rem;
      }
      .buttons {
        justify-content: center;
        flex-wrap: wrap;
      }
    }
  }
`
export default Wrapper
