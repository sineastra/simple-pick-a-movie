import HeroSection from "../../Components/HeroSection/HeroSection"
import Favourites from "../../Components/Favourites/Favourites"
import { movieIntF } from "../../_interfaces/movies"
import { useEffect, useState } from "react"
import { userRequests } from "../../requests/user"


const LandingPage = () => {
	const [favMovies, setFavMovies] = useState<movieIntF[] | null>(null)
	
	useEffect(() => {
		const getData = async () => {
			const data = await userRequests.getFavs()

			setFavMovies(data)
		}

		getData()
	},[])

	return (
		favMovies &&
		<>
			<HeroSection/>
			<Favourites favs={ favMovies }/>
		</>
	)
}

export default LandingPage