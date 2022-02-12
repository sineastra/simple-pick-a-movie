import SearchBar from "../SearchBar/SearchBar"
import styles from "./Header.module.scss"
import { Link } from "react-router-dom"


const Header = () => {

	return (
		<header className={ styles.header }>
			<Link to="/">
				<h1>My Movie Collection</h1>
			</Link>
			<SearchBar/>
		</header>
	)
}

export default Header