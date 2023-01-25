import styled from 'styled-components'

const Wrapper = styled.article`
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
    height: 40vh;
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
    font-size: 1rem;
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
  @media (max-width: 550px) {
    .place-details {
      flex-direction: ${(props) => props.placePage && 'column'};
    }
    .buttons-container {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`

export default Wrapper
