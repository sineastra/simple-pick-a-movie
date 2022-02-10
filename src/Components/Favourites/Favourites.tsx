import { FavCardMovieIntF } from "../../_interfaces/movies"
import styles from "./Favourites.module.scss"
import SingleGridMovie from "../FavCard/FavCard"


interface propsIntF {
	movies: FavCardMovieIntF[]
}
const Favourites = ({ movies }: propsIntF) => {

	return (
		<section className={ styles.wrapper }>
			<h1>My Favourites</h1>
			{ movies.length === 0
				? <div className={ styles.empty } role="no-fav-msg">
					You don't have any favourites yet. Go and browse like a browser.
				</div>
				: <div className={ styles.nonEmpty } role="fav-grid">
					{ movies.map(x => <SingleGridMovie movie={ x } key={ x.imdbId }/>) }
				</div>
			}
		</section>
	)
}

export default Favourites