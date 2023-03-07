import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Navbar'
import Logo from './Logo'
import { useSelector, useDispatch } from 'react-redux'
import { displayAlertThunk, logout } from '../state/globalSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.global)

  const [toggled, setToggled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const handleClick = () => {
    setToggled(!toggled)
  }
  return (
    <Wrapper toggleState={toggled}>
      <Logo />
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
      <div className='navbar-btn'>
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
          <Link className='btn' to='/sign-up'>
            Sign In
          </Link>
        )}
      </div>
      <i className='fa-solid fa-bars' onClick={handleClick}></i>
    </Wrapper>
  )
}

export default Navbar
