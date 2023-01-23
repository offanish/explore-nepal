import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/PageLayout';
import Navbar from './Navbar';

const PageLayout = () => {
  return (
    <div>
      <Navbar />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </div>
  );
};

export default PageLayout;
