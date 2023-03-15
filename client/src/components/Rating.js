const Rating = ({ value, setRating, viewOnly }) => {
  return (
    <div className='rating'>
      <i
        className={
          value >= 1
            ? 'rating-star fa-solid fa-star'
            : 'rating-star fa-solid fa-star empty'
        }
        onClick={() => !viewOnly && setRating(1)}
      ></i>
      <i
        className={
          value >= 2
            ? 'rating-star fa-solid fa-star'
            : 'rating-star fa-solid fa-star empty'
        }
        onClick={() => !viewOnly && setRating(2)}
      ></i>
      <i
        className={
          value >= 3
            ? 'rating-star fa-solid fa-star'
            : 'rating-star fa-solid fa-star empty'
        }
        onClick={() => !viewOnly && setRating(3)}
      ></i>
      <i
        className={
          value >= 4
            ? 'rating-star fa-solid fa-star'
            : 'rating-star fa-solid fa-star empty'
        }
        onClick={() => !viewOnly && setRating(4)}
      ></i>
      <i
        className={
          value >= 5
            ? 'rating-star fa-solid fa-star'
            : 'rating-star fa-solid fa-star empty'
        }
        onClick={() => !viewOnly && setRating(5)}
      ></i>
    </div>
  )
}

export default Rating
