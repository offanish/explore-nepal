import { useSelector } from 'react-redux'

const Alert = ({ margin }) => {
  const { alertType, alertText } = useSelector((state) => state.global)
  return (
    <div className={`alert alert-${alertType} ${margin && 'alert-margin'} `}>
      {alertText}
    </div>
  )
}

export default Alert
