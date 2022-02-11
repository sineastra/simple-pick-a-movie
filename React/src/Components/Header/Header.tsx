import SearchBar from "../SearchBar/SearchBar"
import styles from "./Header.module.scss"


const Header = () => {

	return (
		<header className={ styles.header }>
			<h1>My Movie Collection</h1>
			<SearchBar/>
		</header>
	)
}

export default Header