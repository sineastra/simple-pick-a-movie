import SearchBar from "../../Components/SearchBar/SearchBar"
import SearchCard from "../../Components/SearchCard/SearchCard"
import styles from "./SearchPage.module.scss"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { movieIntF } from "../../_interfaces/movies"
import { useSelector } from "react-redux"
import store, { RootState } from "../../_state/app/store"
import { addFavourite, removeFavourite } from "../../_state/features/userSlice"
import { userRequests } from "../../requests/user"
import { movieRequests } from "../../requests/movies"


const SearchPage = () => {
	const location = useLocation()
	const [movies, setMovies] = useState<movieIntF[]>([])
	const favs = useSelector((state: RootState) => state.userData.favourites)

	//TODO: abstract these.
	const addFav = async (fav: string) => {
		await store.dispatch(addFavourite(fav))
		await userRequests.updateFav(fav)
	}
	const removeFav = async (fav: string) => {
		await store.dispatch(removeFavourite(fav))
		await userRequests.updateFav(fav)
	}

	useEffect(() => {
		const search = location.search
		const getSearchResult = async () => {
			const result = await movieRequests.getSearchs(search)
			console.log(result)

			setMovies(result)
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
								addFav={ addFav }
								removeFav={ removeFav }
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