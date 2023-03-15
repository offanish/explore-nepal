import styled from 'styled-components'

const Wrapper = styled.section`
  width: 100%;
  gap: 0.8rem;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid #d5d5d5;
  transition: all 0.3s;
  &:hover {
    box-shadow: ${(props) => !props.placePage && '1.5px 1.5px 3px #acacac'};
    cursor: ${(props) => !props.placePage && 'pointer'};
  }
  .image {
    width: 100%;
    height: 30vh;
    object-fit: cover;
    object-position: center;
  }
  .image-full {
    height: 60vh;
    object-fit: cover;
  }
  .place-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .place-details-text {
    width: 100%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .place-bottom {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
  }
  h2 {
    font-weight: 500;
    font-size: 1.25rem;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
    font-size: 0.8rem;
    color: #717171;
    margin-bottom: 1rem;
  }
  .description-full {
    white-space: normal;
  }
  .fa-solid {
    margin-right: 0.2rem;
    color: #cd4826;
  }
  .fa-user {
    color: #3cb6d4;
  }
  .buttons-container {
    padding: 0.5rem;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    gap: 0.5rem;
  }
  .place-owner {
    color: #4a4a4a;
    font-size: 0.9rem;
    font-weight: 500;
  }
  .review-heading {
    padding: 0.5rem;
  }
  .review-submit-btn-group {
    width: 40%;
  }
  .form-row {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
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
  .rating-star {
    margin: 0;
    font-size: 2rem;
    cursor: ${(props) => !props.ratingViewOnly && 'pointer'};
    transition: transform 0.2s linear;
  }
  .rating-star:hover {
    transform: ${(props) => !props.ratingViewOnly && 'scale(1.2)'};
  }
  .rating-star.fa-solid {
    color: #e6cb00;
  }
  .rating-star.fa-solid.empty {
    color: #c5c5c5;
  }
  .review-container {
    background-color: #f3f3f3;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem 0.5rem;
    margin-bottom: 1rem;
  }
  .no-reviews-text {
    text-align: center;
    font-size: 2rem;
  }
  .review-name {
    font-weight: 500;
    font-size: 1rem;
  }
  .review-comment {
    color: #7b7b7b;
    font-size: 1rem;
  }

  @media (max-width: 550px) {
    .place-details {
      flex-direction: ${(props) => props.placePage && 'column'};
    }
    .buttons-container {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
    }
    .image-full {
      height: 30vh;
    }
  }
`

export default Wrapper
