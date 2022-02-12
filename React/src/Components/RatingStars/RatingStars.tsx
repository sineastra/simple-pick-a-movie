import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'


interface propsIntF {
	initialRating: number | undefined,
	onChange: (newRating: number) => void,
}
const RatingStars = ({ initialRating, onChange }: propsIntF) => {
	const [rating, setRating] = useState(initialRating || 0)

	const handleRating = (r: number) => {
		setRating(r)
		onChange(r)
	}

	return (
		<Rating onClick={ handleRating } ratingValue={ rating }/>
	)
}
export default RatingStars