import SearchBar from "../../Components/SearchBar/SearchBar"
import SearchCard from "../../Components/SearchCard/SearchCard"
import styles from "./SearchPage.module.scss"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { movieRequests } from "../../requests/movies"
import { SearchCardMovieIntF } from "../../_interfaces/movies"
import { useSelector } from "react-redux"
import store, { RootState } from "../../_state/app/store"
import { addFavourite, removeFavourite } from "../../_state/features/userSlice"


const SearchPage = () => {
	const location = useLocation()
	const [movies, setMovies] = useState<SearchCardMovieIntF[]>([])
	const favs = useSelector((state: RootState) => state.userData.favourites)

	const addFav = async (favId: string) => {
		await store.dispatch(addFavourite(favId))
	}

	const removeFav = async (favId: string) => {
		await store.dispatch(removeFavourite(favId))
	}

	useEffect(() => {
		const search = location.search
		const getSearchResult = async () => {
			const result = await movieRequests.getSearchs(search)

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
								key={ x.imdbId }
							/>)
						: <div>No matches</div>
				}
			</div>
		</section>

	)
}

export default SearchPage