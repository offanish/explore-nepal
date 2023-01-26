import { useQuery } from 'react-query'
import { getUserPlaces } from '../api/authAPI'
import { useMainContext } from '../context/MainContext'

import Loading from '../components/Loading'
import Alert from '../components/Alert'
import Place from '../components/Place'
import Wrapper from '../assets/wrappers/AllPlaces'

const Profile = () => {
  const { user, showAlert } = useMainContext()

  const { data: places, isLoading } = useQuery(
    ['places', user?._id],
    () => {
      return getUserPlaces(user._id)
    },
    {
      enabled: !!user,
    }
  )
  if (isLoading || !user) {
    return (
      <>
        <h1>Profile</h1>
        <Loading />
      </>
    )
  }

  if (places && places.length) {
    const userPlaces = places.map((place) => {
      const { name, location, description, image, _id } = place
      return (
        <Place
          key={_id}
          name={name}
          location={location}
          description={description}
          image={image}
          id={_id}
        />
      )
    })

    return (
      <Wrapper>
        {showAlert && <Alert />}
        <h1>Profile</h1>
        <div className='container'>{userPlaces}</div>
      </Wrapper>
    )
  }
  return <h1>This user doesn't own any places</h1>
}

export default Profile
