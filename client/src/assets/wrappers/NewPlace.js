import styled from 'styled-components'

const Wrapper = styled.main`
  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }
  .form {
    display: flex;
    justify-self: center;
    width: ${({ signUp }) => (signUp ? '50%' : '60%')};
    flex-direction: column;
    gap: 1.5rem;
    margin: 0 auto;
  }
  .form-row {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .form-input {
    border: 2px solid #adadad;
    height: 2rem;
    border-radius: 5px;
    text-indent: 5px;
  }
  .description {
    height: 6rem;
    text-indent: 0;
    padding-left: 10px;
    padding-top: 4px;
    resize: none;
  }
  .registered-btn {
    border: none;
    background: none;
    color: #cd4826;
    margin-left: 5px;
    text-decoration: underline;
    text-decoration-color: transparent;
    transition: all 0.3s;
  }
  .registered-btn:hover {
    text-decoration-color: #cd4826;
  }
  @media (max-width: 550px) {
    .form {
      width: 80%;
    }
  }
`

export default Wrapper
