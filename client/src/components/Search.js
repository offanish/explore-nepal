import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Search'
import { displayAlertThunk } from '../state/globalSlice'

const Search = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!keyword) {
      dispatch(
        displayAlertThunk({
          alertText: 'Please enter a search keyword',
          alertType: 'danger',
        })
      )
      return
    }
    navigate(`/search/${keyword}`)
  }
  return (
    <form onSubmit={handleSubmit}>
      <Wrapper>
        <input
          name='keyword'
          type='text'
          className='search-input'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type='submit' className='search-btn'>
          <i className='fa-solid fa-search'></i>
        </button>
      </Wrapper>
    </form>
  )
}

export default Search
