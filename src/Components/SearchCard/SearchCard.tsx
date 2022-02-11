import { SearchCardMovieIntF } from "../../_interfaces/movies"
import { Link } from "react-router-dom"
import styles from "./SearchCard.module.scss"
import { BaseSyntheticEvent } from "react"


interface propsIntF {
	movie: SearchCardMovieIntF,
	favourites: string[],
	addFav: (f: string) => void,
	removeFav: (f: string) => void,
}
const SearchCard = ({ movie, favourites, addFav, removeFav }: propsIntF) => {
	const isFav = favourites.some(x => x === movie.imdbId)

	return (
		<div className={ styles.mainWrapper } role="poster">
			<Link to={ `/details/${ movie.imdbId }` }>
				<img src={ movie.poster } alt="poster"/>
			</Link>
			<div className={ styles.infoWrapper }>
				<h1>{ movie.title }</h1>

				<div>
					<span>{ movie.genres.join(", ") } | </span>
					<span>{ movie.runtime } minutes</span>
				</div>
				<p>
					{ movie.description }
				</p>
				<Link to={ movie.officialSite }>Visit official site</Link>
				{ isFav
					? <button
						className={ styles.removeBtn }
						onClick={ (e) => removeFav(movie.imdbId) }>Remove From Favourites
					</button>
					: <button
						className={ styles.addBtn }
						onClick={ (e) => addFav(movie.imdbId) }>Add To Favourites
					</button>
				}
			</div>
		</div>
	)
}

export default SearchCard