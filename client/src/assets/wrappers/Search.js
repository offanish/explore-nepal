import styled from 'styled-components'

const Wrapper = styled.section`
  padding-bottom: 2rem;
  display: flex;
  .search-input {
    flex: 6;
    height: 2.5rem;
    border: 2px solid #cd4826;
    border-right: none;
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    text-indent: 5px;
    transition: all 0.2s;
  }
  .search-input:focus {
    outline: 1px solid #cd4826;
  }

  .search-btn {
    flex: 1;
    cursor: pointer;
    color: #ffffff;
    background-color: #cd4826;
    border: 2px solid #cd4826;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    transition: all 0.2s;
  }
  .search-btn:hover {
    background-color: #b44125;
    border: 2px solid #b44125;
  }
`

export default Wrapper
