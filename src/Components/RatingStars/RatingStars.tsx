import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'


const RatingStars = () => {
	const [rating, setRating] = useState(0)

	const handleRating = (rate: number) => {
		setRating(rate)

	}

	return (

		<Rating onClick={ handleRating } ratingValue={ rating }/>
	)
}
export default RatingStars