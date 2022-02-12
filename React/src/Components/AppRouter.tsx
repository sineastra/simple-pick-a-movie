import { Routes, Route } from "react-router-dom"
import MainLayout from "../Layouts/MainLayout"
import LandingPage from "../Pages/LandingPage/LandingPage"
import SearchPage from "../Pages/SearchPage/SearchPage"
import DetailsPage from "../Pages/DetailsPage/DetailsPage"
import SignIn from "../Pages/SignIn/SignIn"
import AuthGuard from "../RouteGuards/AuthGuard"


const AppRouter = () => {

	return (
		<Routes>
			<Route path="/" element={ <MainLayout/> }>
				<Route path="/search" element={
					<AuthGuard>
						<SearchPage/>
					</AuthGuard>
				}/>
				<Route path="/details/:id" element={
					<AuthGuard>
						<DetailsPage/>
					</AuthGuard>
				}/>
				<Route path="/" element={
					<AuthGuard>
						<LandingPage/>
					</AuthGuard>
				}/>
			</Route>
			<Route path="/sign-in" element={ <SignIn/> }/>
		</Routes>
	)
}

export default AppRouter