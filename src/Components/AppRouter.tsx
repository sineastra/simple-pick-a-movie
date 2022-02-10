import { Routes, Route } from "react-router-dom"
import MainLayout from "../Layouts/MainLayout"
import LandingPage from "../Pages/LandingPage/LandingPage"


const AppRouter = () => {

	return (
		<Routes>
			<Route path="/" element={ <MainLayout/> }>
				<Route path="/" element={ <LandingPage/> }/>
			</Route>
		</Routes>
	)
}

export default AppRouter