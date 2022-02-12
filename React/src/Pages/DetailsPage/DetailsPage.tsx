import RatingStars from "../../Components/RatingStars/RatingStars"
import SearchCard from "../../Components/SearchCard/SearchCard"
import { BaseSyntheticEvent, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { movieRequests } from "../../requests/movies"
import { useSelector } from "react-redux"
import store, { RootState } from "../../_state/app/store"
import { addFavourite, removeFavourite } from "../../_state/features/userSlice"
import styles from "./DetailsPage.module.scss"
import { TimeoutId } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types"
import { userRequests } from "../../requests/user"
import { movieIntF } from "../../_interfaces/movies"


const DetailsPage = () => {
	const params = useParams()
	const favs = useSelector((state: RootState) => state.userData.favourites)
	const [movie, setMovie] = useState<movieIntF | null>(null)
	const [notes, setNotes] = useState<string>('')
	const [rating, setRating] = useState<number>(0)
	const timeout = useRef<TimeoutId | null>(null)

	const addFav = async (fav: string) => {
		await store.dispatch(addFavourite(fav))
		await userRequests.updateFav(fav)
	}
	const removeFav = async (fav: string) => {
		await store.dispatch(removeFavourite(fav))
		await userRequests.updateFav(fav)
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
			const paramsTemp: string = params.id
			//TODO: Change the user with redux state
			const userId = '620772b331579175679664d1'

			const getData = async () => {
				const movieData = await movieRequests.getDetails(paramsTemp)
				const userMovieData = await userRequests.getMovieDetailsForUser(paramsTemp)

				const notesData = userMovieData.note
				const ratingData = userMovieData.rating

				notesData && setNotes(notesData)
				ratingData && setRating(ratingData)
				setMovie(movieData)
			}

			getData()
		}
	}, [params.id])

	return (
		movie &&
		<section className={ styles.wrapper }>
			<div className={ styles.innerWrapper }>
				<SearchCard
					movie={ movie }
					favourites={ favs }
					removeFav={ removeFav }
					addFav={ addFav }/>
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