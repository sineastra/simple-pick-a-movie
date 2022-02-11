import RatingStars from "../../Components/RatingStars/RatingStars"
import SearchCard from "../../Components/SearchCard/SearchCard"
import { useEffect, useState } from "react"
import { SearchCardMovieIntF } from "../../_interfaces/movies"
import { useParams } from "react-router-dom"
import { movieRequests } from "../../requests/movies"
import { useSelector } from "react-redux"
import store, { RootState } from "../../_state/app/store"
import { addFavourite, removeFavourite } from "../../_state/features/userSlice"


interface propsIntF {
	match?: any
}
const DetailsPage = ({ match }: propsIntF) => {
	const [movie, setMovie] = useState<SearchCardMovieIntF | null>(null)
	const favs = useSelector((state: RootState) => state.userData.favourites)
	const params = useParams()

	const addFav = async (favId: string) => {
		await store.dispatch(addFavourite(favId))
	}

	const removeFav = async (favId: string) => {
		await store.dispatch(removeFavourite(favId))
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
		<section>
			<SearchCard movie={ movie } favourites={ favs } removeFav={ removeFav } addFav={ addFav }/>
			<RatingStars/>
		</section>
	)
}

export default DetailsPage