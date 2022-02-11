import { Link } from "react-router-dom"
import styles from "./FavCard.module.scss"
import { FavCardMovieIntF } from "../../_interfaces/movies"


interface propsIntF {
	movie: FavCardMovieIntF,
}

const SingleGridMovie = ({ movie }: propsIntF) => {
	return (
		<div role="slide">
			<Link to={ `/details/${ movie.imdbId }` } className={ styles.link }>
				<img src={ movie.poster } alt="poster" className={ styles.slide }/>
				<h4 role="title">{ movie.title }</h4>
				<h5 role="genre">{ movie.genres.join(', ') }</h5>
			</Link>
		</div>
	)
}

export default SingleGridMovie