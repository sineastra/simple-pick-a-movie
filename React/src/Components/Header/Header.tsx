import SearchBar from "../SearchBar/SearchBar"
import styles from "./Header.module.scss"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import store, { RootState } from "../../_state/app/store"
import { userRequests } from "../../requests/user"
import { changeUser } from "../../_state/features/userSlice"


const Header = () => {
	const navigate = useNavigate()
	const user = useSelector((state: RootState) => state.userData)

	const logout = () => {
		const data = userRequests.logout()

		document.cookie = process.env.REACT_APP_COOKIE_NAME + '=;expires=Mon, 01 Mar 1980 00:00:01 GMT;'
		store.dispatch(changeUser(null))
		navigate("/")

	}

	return (
		<header className={ styles.header }>
			<div className={ styles.logoWrapper }>
				<Link to="/">
					<h1>{ user.loggedUser?.name }'s Collection</h1>
				</Link>
				{ user.loggedUser && <h5 className={ styles.logout } onClick={ logout }>logout</h5> }
			</div>
			<SearchBar/>
		</header>
	)
}

export default Header