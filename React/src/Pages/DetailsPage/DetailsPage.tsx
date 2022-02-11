import RatingStars from "../../Components/RatingStars/RatingStars"
import SearchCard from "../../Components/SearchCard/SearchCard"
import { BaseSyntheticEvent, useEffect, useState } from "react"
import { SearchCardMovieIntF } from "../../_interfaces/movies"
import { useParams } from "react-router-dom"
import { movieRequests } from "../../requests/movies"
import { useSelector } from "react-redux"
import store, { RootState } from "../../_state/app/store"
import { addComment, addFavourite, addRating, removeFavourite } from "../../_state/features/userSlice"
import styles from "./DetailsPage.module.scss"
import { ratingIntF } from "../../_interfaces/state"


const DetailsPage = () => {
	const params = useParams()
	const [movie, setMovie] = useState<SearchCardMovieIntF | null>(null)
	const userData = useSelector((state: RootState) => state.userData)

	const ratingObj: ratingIntF = {
		_id: params.id || '',
		rating: 0,
		privateComment: '',
	}
	const movieRating = userData.ratings.find(x => x._id === params.id) || ratingObj

	const addFav = async (favId: string) => {
		await store.dispatch(addFavourite(favId))
	}
	const removeFav = async (favId: string) => {
		await store.dispatch(removeFavourite(favId))
	}
	const updateRating = async (newRating: number) => {
		await store.dispatch(addRating({ ...ratingObj, rating: newRating }))
	}
	const updatePrivateComment = async (e: BaseSyntheticEvent) => {
		await store.dispatch(addComment({ ...ratingObj, privateComment: e.target.value }))
	}

	useEffect(() => {
		if (typeof params.id === 'string' && params.id !== '') {
			const paramsTemp: string = params.id

			const getData = async () => {
				const data = await movieRequests.getDetails(paramsTemp)

				setMovie(data)
			}

			getData()
		}
	}, [params.id])

	return (
		movie &&
		<section className={ styles.wrapper }>
			<div className={ styles.innerWrapper }>
				<SearchCard movie={ movie } favourites={ userData.favourites } removeFav={ removeFav }
				            addFav={ addFav }/>
				<RatingStars initialRating={ movieRating.rating } onChange={ updateRating }/>
				<div className={ styles.textAreaWrapper }>
					<textarea name="textarea"
					          onChange={ updatePrivateComment }
					          placeholder="Your private notes and comments about the movie..."
					          value={ movieRating.privateComment }
					/>
				</div>
			</div>
		</section>
	)
}

export default DetailsPage