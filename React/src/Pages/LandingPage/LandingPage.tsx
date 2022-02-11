import HeroSection from "../../Components/HeroSection/HeroSection"
import Favourites from "../../Components/Favourites/Favourites"
import { FavCardMovieIntF } from "../../_interfaces/movies"
import { useSelector } from "react-redux"
import { RootState } from "../../_state/app/store"
import { useEffect, useState } from "react"
import { movieRequests } from "../../requests/movies"

const LandingPage = () => {
	const [movies, setMovies] = useState<FavCardMovieIntF[]>([])
	const moviesIds: string[] = useSelector((state: RootState) => state.userData.favourites)

	useEffect(() => {
		const getData = async () => {
			if (moviesIds.length > 0) {
				const data = await movieRequests.getFavs(moviesIds)

				setMovies(data)
			}
		}

		getData()
	}, [moviesIds])

	return (
		<>
			<HeroSection/>
			<Favourites movies={ movies }/>
		</>
	)
}

export default LandingPage