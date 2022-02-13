import SearchBar from "../../Components/SearchBar/SearchBar"
import SearchCard from "../../Components/SearchCard/SearchCard"
import styles from "./SearchPage.module.scss"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { movieIntF } from "../../_interfaces/movies"
import { userRequests } from "../../requests/user"
import { movieRequests } from "../../requests/movies"


const SearchPage = () => {
	const location = useLocation()
	const [movies, setMovies] = useState<movieIntF[]>([])
	const [favs, setFavs] = useState<movieIntF[]>([])

	const updateFav = async (fav: string) => {
		const updatedFavs = await userRequests.updateFavs(fav)

		setFavs(updatedFavs)
	}

	useEffect(() => {
		const search = location.search

		const getSearchResult = async () => {
			const [moviesData, favsData] = await Promise.all([
				movieRequests.getSearchs(search),
				userRequests.getFavs(),
			])

			setMovies(moviesData)
			setFavs(favsData)
		}

		if (search) {
			getSearchResult()
		}
	}, [location.search])

	return (
		<section className={ styles.wrapper }>
			<div className={ styles.upperWrapper }>
				<h1>Search</h1>
				<div className={ styles.searchBarWrapper }>
					<SearchBar/>
				</div>
			</div>
			<div className={ styles.cardsWrapper }>
				{
					movies.length > 0
						? movies.map(x =>
							<SearchCard
								updateFav={ updateFav }
								favourites={ favs }
								movie={ x }
								key={ x.externalId }
							/>)
						: <div>No matches</div>
				}
			</div>
		</section>

	)
}

export default SearchPage