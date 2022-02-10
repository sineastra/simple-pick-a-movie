import SearchBar from "../../Components/SearchBar/SearchBar"
import SearchCard from "../../Components/SearchCard/SearchCard"
import styles from "./SearchPage.module.scss"


const mockedMovie = {
	imdbId: 'a',
	poster: 'https://static.tvmaze.com/uploads/images/medium_portrait/190/476117.jpg',
	title: 'c',
	genres: ['a', 'b', 'c'],
	runtime: 1,
	officialSite: 'd',
	description: 'e',
}
const SearchPage = () => {
	const mock = [1, 2, 3]

	const addFav = () => {
		console.log('addFav')
	}

	const removeFav = () => {
		console.log('removeFav')
	}

	return (
		<section className={ styles.wrapper }>
			<div className={ styles.upperWrapper }>
				<h1>Search</h1>
				<div className={ styles.searchBarWrapper }>
					<SearchBar/>
				</div>
			</div>
			<div className={ styles.cardsWrapper }>
				{ mock.map(x =>
					<SearchCard
						addFav={ addFav }
						removeFav={ removeFav }
						favourites={ [] }
						movie={ mockedMovie }
					/>) }
			</div>
		</section>

	)
}

export default SearchPage