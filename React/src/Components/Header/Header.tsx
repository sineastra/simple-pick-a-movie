import SearchBar from "../SearchBar/SearchBar"
import styles from "./Header.module.scss"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../_state/app/store"


const Header = () => {
	const user = useSelector((state: RootState) => state.userData)

	return (
		user.loggedUser &&
		<header className={ styles.header }>
			<Link to="/">
				<h1>{ user.loggedUser.name }'s Collection</h1>
			</Link>
			<SearchBar/>
		</header>
	)
}

export default Header