import HeroSection from "../../Components/HeroSection/HeroSection"
import Favourites from "../../Components/Favourites/Favourites"
import { FavCardMovieIntF } from "../../_interfaces/movies"


const mockedMovies: FavCardMovieIntF[] = [{
	imdbId: '1',
	poster: "https://static.tvmaze.com/uploads/images/medium_portrait/237/592589.jpg",
	title: '1',
	genre: 'asd',
}, {
	imdbId: '2',
	poster: "https://static.tvmaze.com/uploads/images/medium_portrait/237/592589.jpg",
	title: '1',
	genre: 'asd',
}, {
	imdbId: '3',
	poster: "https://static.tvmaze.com/uploads/images/medium_portrait/237/592589.jpg",
	title: '1',
	genre: 'asd',
}]

const LandingPage = () => {

	return (
		<>
			<HeroSection/>
			<Favourites movies={ mockedMovies }/>
		</>
	)
}

export default LandingPage