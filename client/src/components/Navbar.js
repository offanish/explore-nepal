import { useState } from 'react'
import { useNavigate, NavLink, Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Navbar'
import { useMutation } from 'react-query'
import Logo from './Logo'
import { useMainContext } from '../context/MainContext'

const Navbar = () => {
  const { navigatePage, user, logoutUser } = useMainContext()
  const [toggled, setToggled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const navigateRouter = useNavigate()
  const handleClick = () => {
    setToggled(!toggled)
  }
  const navigate = () => {
    navigatePage()
  }
  return (
    <Wrapper toggleState={toggled}>
      <Logo />
      <div className="nav-links">
        <NavLink
          to="/places"
          end
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
          onClick={navigate}
        >
          All Places
        </NavLink>
        <NavLink
          to="/places/new"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
          onClick={navigate}
        >
          New Place
        </NavLink>
      </div>
      <div className="navbar-btn">
        {user ? (
          <>
            <button
              className="btn profile-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="profile-btn-group">
                <span>{user.name.split(' ')[0]}</span>
                <i className="fa-sharp fa-solid fa-caret-down"></i>
              </div>
            </button>
            <div
              className={showDropdown ? 'dropdown show-dropdown' : 'dropdown'}
            >
              <Link className="dropdown-links">Profile</Link>
              <div className="border"></div>
              <Link
                className="dropdown-links"
                onClick={() => {
                  setShowDropdown(false)
                  logoutUser()
                }}
              >
                Logout
              </Link>
            </div>
          </>
        ) : (
          <button
            className="btn"
            onClick={() => {
              navigate()
              navigateRouter('/sign-up')
            }}
          >
            Sign In
          </button>
        )}
      </div>
      <i className="fa-solid fa-bars" onClick={handleClick}></i>
    </Wrapper>
  )
}

export default Navbar
