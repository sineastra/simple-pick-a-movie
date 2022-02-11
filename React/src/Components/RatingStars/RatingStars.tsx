import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'


interface propsIntF {
	initialRating: number | undefined,
	onChange?: (newRating: number) => void,
}
const RatingStars = ({ initialRating, onChange }: propsIntF) => {
	const [rating, setRating] = useState(initialRating || 0)

	const handleRating = (rating: number) => {
		setRating(rating / 20)
		onChange && onChange(rating)
	}

	return (
		<Rating onClick={ handleRating } ratingValue={ rating }/>
	)
}
export default RatingStars