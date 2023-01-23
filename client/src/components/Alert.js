import { useMainContext } from '../context/MainContext'

const Alert = ({ margin }) => {
  const { alertType, alertText } = useMainContext()
  return (
    <div className={`alert alert-${alertType} ${margin && 'alert-margin'} `}>
      {alertText}
    </div>
  )
}

export default Alert
