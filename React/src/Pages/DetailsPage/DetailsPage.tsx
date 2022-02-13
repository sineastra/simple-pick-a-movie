import RatingStars from "../../Components/RatingStars/RatingStars"
import SearchCard from "../../Components/SearchCard/SearchCard"
import { BaseSyntheticEvent, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { movieRequests } from "../../requests/movies"
import styles from "./DetailsPage.module.scss"
import { TimeoutId } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types"
import { userRequests } from "../../requests/user"
import { movieIntF } from "../../_interfaces/movies"
import user from "@testing-library/user-event"


const DetailsPage = () => {
	const params = useParams()
	const [movie, setMovie] = useState<movieIntF | null>(null)
	const [notes, setNotes] = useState<string>('')
	const [rating, setRating] = useState<number>(0)
	const [isLoading, setIsLoading] = useState(true)
	const [favs, setFavs] = useState<movieIntF[]>([])
	const timeout = useRef<TimeoutId | null>(null)

	const updateFav = async (fav: string) => {
		const updatedFavs = await userRequests.updateFavs(fav)

		setFavs(updatedFavs)
	}
	const updateRating = async (newRating: number) => {
		movie && await userRequests.updateRating(movie.externalId, newRating)
	}
	const updateNote = async (e: BaseSyntheticEvent) => {
		const note = e.target.value
		setNotes(note)

		if (timeout.current) {
			clearTimeout(timeout.current)
		}

		timeout.current = setTimeout(async () => {
			movie && await userRequests.updateNote(movie.externalId, note)
		}, 1000)
	}

	useEffect(() => {
		if (typeof params.id === 'string' && params.id !== '') {
			const movieId: string = params.id

			const getData = async () => {
				const [movieData, userMovieData, userFavs] = await Promise.all([
					movieRequests.getDetails(movieId),
					userRequests.getMovieDetailsForUser(movieId),
					userRequests.getFavs(),
				])

				const notesData = userMovieData.notes
				const ratingData = userMovieData.rating

				notesData && setNotes(notesData)
				ratingData && setRating(ratingData)
				setMovie(movieData)
				setFavs(userFavs)
				setIsLoading(false)
			}

			getData()
		}
	}, [params.id])

	return (
		movie && favs &&
		<section className={ styles.wrapper }>
			<div className={ styles.innerWrapper }>
				<SearchCard
					movie={ movie }
					favourites={ favs }
					updateFav={ updateFav }/>
				<RatingStars initialRating={ rating } onChange={ updateRating }/>
				<div className={ styles.textAreaWrapper }>
					<textarea name="textarea"
					          onChange={ updateNote }
					          placeholder="Your private notes and comments about the movie..."
					          value={ notes }
					/>
				</div>
			</div>
		</section>
	)
}

export default DetailsPage