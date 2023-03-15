import styled from 'styled-components'

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 15%;
  border-bottom: 2px solid #a9a9a9;
  .nav-links {
    display: flex;
    gap: 2rem;
  }
  .nav-link {
    text-decoration: none;
    padding-top: 2px;
    color: #484848;
    height: inherit;
    border-bottom: 2px solid transparent;
    transition: all 0.3s;
  }
  .active {
    color: #cd4826;
  }
  .nav-link:hover {
    border-bottom: 2px solid #28c697;
  }
  .fa-bars {
    position: absolute;
    top: 1rem;
    right: 4%;
    display: none;
    font-size: 1.6rem;
    color: #28c697;
    transition: all 0.3s;
  }
  .fa-bars:hover {
    transform: scale(1.1, 1.1);
  }
  .navbar-btn {
    position: relative;
    /* margin-bottom: 10px; */
  }
  .profile-btn {
    padding: 10px 2rem;
  }
  .profile-btn-group {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .dropdown {
    visibility: hidden;
    position: absolute;
    top: 45px;
    width: 100%;
    border-radius: 5px;
    background-color: #e9e9e9;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .show-dropdown {
    visibility: visible;
  }
  .border {
    width: 100%;
    height: 2px;
    background-color: #ffffff;
  }
  .dropdown-links {
    padding: 8px;
    text-align: center;
    width: 100%;
    text-decoration: none;
    color: #484848;
    transition: background-color 0.3s, color 0.3s;
  }
  .dropdown-links:hover {
    background-color: #979797;
    color: #ffffff;
  }
  @media (max-width: 1000px) {
    padding: 1rem 2%;
  }
  @media (max-width: 550px) {
    padding: 0.5rem 5%;
    flex-direction: column;
    align-items: flex-start;
    .fa-bars {
      display: block;
    }
    .nav-links {
      display: ${(props) => !props.toggleState && 'none'};
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      text-align: center;
    }
    .nav-link {
      width: 100%;
      text-align: center;
    }
    .nav-link:hover {
      border-bottom: 2px solid transparent;
      color: #a9a9a9;
    }
    .navbar-btn {
      display: ${(props) => !props.toggleState && 'none'};
      margin-top: 0.6rem;
      align-self: center;
    }
  }
`

export default Wrapper
