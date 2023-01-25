import Landing from './pages/Landing'
import AllPlaces from './pages/AllPlaces'
import NewPlace from './pages/NewPlace'
import SignUp from './pages/SignUp'
import PlacePage from './pages/PlacePage'
import Home from './pages/Home'

import PageLayout from './components/PageLayout'

import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/landing' element={<Landing />} />
      <Route element={<PageLayout />}>
        <Route path='/places'>
          <Route index element={<AllPlaces />} />
          <Route path='new' element={<NewPlace />} />
          <Route path=':id' element={<PlacePage />} />
        </Route>
        <Route path='sign-up' element={<SignUp />} />
      </Route>
      <Route path='*' element={<h1>Page Doesn't exist</h1>} />
    </Routes>
  )
}

export default App
