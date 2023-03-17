import Logo from '../components/Logo'
import Wrapper from '../assets/wrappers/Landing'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()
  const continueToWebsite = () => {
    navigate('/places')
  }
  const handleSignUp = () => {
    navigate('/sign-up')
  }
  const handleLogin = () => {
    navigate('/sign-up')
  }
  return (
    <Wrapper>
      <div className='container'>
        <Logo />
        <p className='introduction'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut dolore,
          molestiae illum voluptatibus quaerat labore um asperiores quam est
          doloremque! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eos, pariatur?
        </p>
        <h2>Create account to add new places!</h2>
        <div className='buttons'>
          <button className='btn' onClick={handleSignUp}>
            Sign Up
          </button>
          <button className='btn btn-secondary' onClick={handleLogin}>
            Log In
          </button>
          <button className='btn btn-continue' onClick={continueToWebsite}>
            Continue to website
          </button>
        </div>
      </div>
    </Wrapper>
  )
}

export default Landing
