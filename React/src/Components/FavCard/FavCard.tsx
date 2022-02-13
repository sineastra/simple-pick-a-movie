import { Link } from "react-router-dom"
import styles from "./FavCard.module.scss"
import { movieIntF } from "../../_interfaces/movies"
import { imagePipe } from "../../utils/pipes"


interface propsIntF {
	movie: movieIntF,
}

const SingleGridMovie = ({ movie }: propsIntF) => {
	return (
		<div>
			<Link to={ `/details/${ movie.externalId }` } className={ styles.link }>
				<img src={ imagePipe(movie.poster) } alt="poster" className={ styles.slide }/>
				<h4>{ movie.title }</h4>
				<h5>{ movie.genres.join(', ') }</h5>
			</Link>
		</div>
	)
}

export default SingleGridMovie