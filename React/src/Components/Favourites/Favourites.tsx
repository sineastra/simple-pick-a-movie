import { movieIntF } from "../../_interfaces/movies"
import styles from "./Favourites.module.scss"
import SingleGridMovie from "../FavCard/FavCard"


interface propsIntF {
	favs: movieIntF[]
}
const Favourites = ({ favs }: propsIntF) => {

	return (
		<section className={ styles.wrapper }>
			<h1>My Favourites</h1>
			{ favs.length === 0
				? <div className={ styles.empty }>
					You don't have any favourites yet. Go and browse like a browser.
				</div>
				: <div className={ styles.nonEmpty }>
					{ favs.map(x => <SingleGridMovie movie={ x } key={ x.externalId }/>) }
				</div>
			}
		</section>
	)
}

export default Favourites