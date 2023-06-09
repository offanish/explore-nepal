import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font: inherit;
}
body {
  background-color: ${({ theme }) => (theme.dark ? '#343434' : '#ffffff')};
  font-family: 'Inter', sans-serif;
  letter-spacing: 1px;
  color: ${({ theme }) => (theme.dark ? '#e7e7e7' : 'rgb(65, 65, 65)')};
}
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

/* buttons */

.btn {
  border-radius: 5px;
  text-transform: capitalize;
  text-align: center;
  padding: 10px 4rem;
  border: none;
  text-decoration: none;
  background-color: #28c697;
  color: #ffffff;
  letter-spacing: 1.5px;
  transition: all 0.3s;
}
.btn:disabled {
  cursor: not-allowed;
}
.btn:hover {
  background-color: #209672;
}
.btn-secondary {
  background-color: #a1a1a1;
}
.btn-secondary:hover {
  background-color: #c5c5c5;
}
.btn-block {
  width: 100%;
}
.btn-edit {
  width: 100%;
  padding: 6px 3rem;
  background-color: #3cb6d4;
}
.btn-edit:hover {
  background-color: #318fa7;
}
.btn-delete {
  width: 100%;
  padding: 6px 3rem;
  background-color: #cd4826;
}
.btn-delete:hover {
  background-color: #952d13;
}

/* alert */

.alert {
  width: 100%;
  text-align: center;
  padding: 1rem;
  border-radius: 5px;
}
.alert-success {
  background-color: rgb(154, 255, 158);
  color: rgb(30, 100, 30);
}
.alert-danger {
  background-color: rgb(255, 172, 172);
  color: rgb(118, 19, 19);
}
.alert-margin {
  margin-bottom: 0.5rem;
}
/* rating */
.rating {
  display: flex;
}

input, textarea {
  background-color: transparent;
  color: inherit;
}

/* place page */
@media (max-width: 550px) {
  .place-page {
    margin-top: 1rem;
  }
}


`

export default GlobalStyles
