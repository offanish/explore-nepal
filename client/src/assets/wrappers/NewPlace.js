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
  .thumbnail-images {
    display: flex;
    gap: 0.5rem;
  }
  .img-thumbnail-container {
    width: 5rem;
    height: 5rem;
    border: 2px solid #28c697;
    border-radius: 5px;
    overflow: hidden;
  }
  .img-thumbnail {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }
  .image-upload {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 12rem;
    height: 3rem;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    background-color: #cd4826;
    transition: background-color 0.2s;
  }
  .image-upload:hover {
    background-color: #ae4329;
  }
  .image-upload-label {
    width: 12rem;
  }
  .add-new-image {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #28c697;
    font-size: 2rem;
    transition: font-size 0.1s linear;
    cursor: pointer;
  }
  .add-new-image:hover {
    font-size: 2.5rem;
  }
  .img-group-container {
    position: relative;
  }
  .fa-xmark {
    position: absolute;
    font-size: 1.25rem;
    top: 3px;
    right: 5px;
    color: #ffffff;
    text-shadow: 0.1px 1.5px 2px #000000;
    cursor: pointer;
    transition: transform 0.1s linear;
  }
  .fa-xmark:hover {
    transform: scale(1.2);
  }
  @media (max-width: 550px) {
    .form {
      width: 80%;
    }
  }
`

export default Wrapper
