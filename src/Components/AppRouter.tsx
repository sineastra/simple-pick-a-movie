import { Routes, Route } from "react-router-dom"
import MainLayout from "../Layouts/MainLayout"
import LandingPage from "../Pages/LandingPage/LandingPage"
import SearchPage from "../Pages/SearchPage/SearchPage"


const AppRouter = () => {

	return (
		<Routes>
			<Route path="/" element={ <MainLayout/> }>
				<Route path="/" element={ <LandingPage/> }/>
				<Route path="/search" element={ <SearchPage/> }/>
			</Route>
		</Routes>
	)
}

export default AppRouter