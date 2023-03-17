import { Outlet } from 'react-router-dom'
import Wrapper from '../assets/wrappers/PageLayout'
import Footer from './Footer'
import Navbar from './Navbar'

const PageLayout = () => {
  return (
    <div>
      <Navbar />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
    </div>
  )
}

export default PageLayout
