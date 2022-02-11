import { Routes, Route } from "react-router-dom"
import MainLayout from "../Layouts/MainLayout"
import LandingPage from "../Pages/LandingPage/LandingPage"
import SearchPage from "../Pages/SearchPage/SearchPage"
import DetailsPage from "../Pages/DetailsPage/DetailsPage"


const AppRouter = () => {

	return (
		<Routes>
			<Route path="/" element={ <MainLayout/> }>
				<Route path="/" element={ <LandingPage/> }/>
				<Route path="/search" element={ <SearchPage/> }/>
				<Route path="/details/:id" element={ <DetailsPage/> }/>
			</Route>
		</Routes>
	)
}

export default AppRouter