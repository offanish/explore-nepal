import { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Navbar'
import Logo from './Logo'
import { useSelector, useDispatch } from 'react-redux'
import { displayAlertThunk, logout } from '../state/globalSlice'
import { apiSlice } from '../state/apiSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.global)

  const dropdownRef = useRef(null)
  const [toggled, setToggled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const handleClick = () => {
    setToggled(!toggled)
  }
  const disableDropdown = (e) => {
    if (dropdownRef && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', disableDropdown)
    return () => {
      document.removeEventListener('mousedown', disableDropdown)
    }
  }, [])
  return (
    <Wrapper toggleState={toggled}>
      <Link to='/places' style={{ textDecoration: 'none' }}>
        <Logo />
      </Link>
      <div className='nav-links'>
        <NavLink
          to='/places'
          end
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
          onClick={() => setShowDropdown(false)}
        >
          All Places
        </NavLink>
        <NavLink
          to='/places/new'
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
          onClick={() => setShowDropdown(false)}
        >
          New Place
        </NavLink>
      </div>

      <div ref={dropdownRef} className='navbar-btn'>
        {user ? (
          <>
            <button
              className='btn profile-btn'
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className='profile-btn-group'>
                <span>{user.name.split(' ')[0]}</span>
                <i className='fa-sharp fa-solid fa-caret-down'></i>
              </div>
            </button>
            <div
              className={showDropdown ? 'dropdown show-dropdown' : 'dropdown'}
            >
              <Link
                className='dropdown-links'
                to='/profile'
                onClick={() => {
                  setShowDropdown(false)
                }}
              >
                Profile
              </Link>
              <div className='border'></div>
              <Link
                className='dropdown-links'
                onClick={() => {
                  setShowDropdown(false)
                  dispatch(logout())
                  dispatch(
                    apiSlice.util.invalidateTags({ type: 'Place', id: 'User' })
                  )
                  dispatch(
                    displayAlertThunk({
                      alertType: 'success',
                      alertText: 'Logged Out Successfully',
                    })
                  )
                }}
              >
                Logout
              </Link>
            </div>
          </>
        ) : (
          <Link className='btn login-btn' to='/sign-up'>
            Sign In
          </Link>
        )}
      </div>
      <i className='fa-solid fa-bars' onClick={handleClick}></i>
    </Wrapper>
  )
}

export default Navbar
