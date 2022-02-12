import HeroSection from "../../Components/HeroSection/HeroSection"
import Favourites from "../../Components/Favourites/Favourites"
import { movieIntF } from "../../_interfaces/movies"
import { useSelector } from "react-redux"
import { RootState } from "../../_state/app/store"
import { useEffect, useState } from "react"
import { movieRequests } from "../../requests/movies"
import { userRequests } from "../../requests/user"


const LandingPage = () => {
	const [favMovies, setFavMovies] = useState<movieIntF[] | null>(null)
	const favIds: movieIntF[] = useSelector((state: RootState) => state.userData.favourites)
	
	useEffect(() => {
		const getData = async () => {
			const data = await userRequests.getFavs()

			setFavMovies(data)
		}

		getData()
	},[favIds])

	return (
		favMovies &&
		<>
			<HeroSection/>
			<Favourites favs={ favMovies }/>
		</>
	)
}

export default LandingPage