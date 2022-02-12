import { movieIntF } from "../../_interfaces/movies"
import { Link } from "react-router-dom"
import styles from "./SearchCard.module.scss"
import { BaseSyntheticEvent } from "react"
import { descriptionPipe, genresPipe, imagePipe } from "../../utils/pipes"


interface propsIntF {
	movie: movieIntF,
	favourites: string[],
	addFav: (f: string) => void,
	removeFav: (f: string) => void,
}
const SearchCard = ({ movie, favourites, addFav, removeFav }: propsIntF) => {
	const isFav = favourites.some(x => x === movie.externalId)

	return (
		<div className={ styles.mainWrapper } role="poster">
			<Link to={ `/details/${ movie.externalId }` }>
				<img src={ imagePipe(movie.poster) } alt="poster"/>
			</Link>
			<div className={ styles.infoWrapper }>
				<h1>{ movie.title }</h1>

				<div>
					<span>{ genresPipe(movie.genres) } | </span>
					<span>{ movie.runtime } minutes</span>
				</div>
				<p className={ styles.description }>
					<span>
						{ descriptionPipe(movie.description) }
					</span>
				</p>
				<a href={ movie.officialSite }>Visit official site</a>
				{ isFav
					? <button
						className={ styles.removeBtn }
						onClick={ (e) => removeFav(movie.externalId) }>Remove From Favourites
					</button>
					: <button
						className={ styles.addBtn }
						onClick={ (e) => addFav(movie.externalId) }>Add To Favourites
					</button>
				}
			</div>
		</div>
	)
}

export default SearchCard