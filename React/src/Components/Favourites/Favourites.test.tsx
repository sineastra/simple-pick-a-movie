import renderer from "react-test-renderer"
import { BrowserRouter } from "react-router-dom"
import Favourites from "./Favourites"
import { FavCardMovieIntF } from "../../_interfaces/movies"


const renderTree = (movies: FavCardMovieIntF[]) =>
	renderer.create(
		<BrowserRouter>
			<Favourites movies={ movies }/>
		</BrowserRouter>,
	)
const mockedMovies: FavCardMovieIntF[] = [{
	imdbId: 'a',
	poster: 'b',
	title: 'c',
	genres: ['d', 'e'],
}, {
	imdbId: 'd',
	poster: 'c',
	title: 'b',
	genres: ['a', 'b'],
}]

describe("---> Testing /Components/Favourites", () => {
	it("should render correctly when there are no favourite movies", () => {
		const tree = renderTree(mockedMovies).toJSON()

		expect(tree).toMatchSnapshot()
	})
	it("should render correctly when there are NO favourite movies", () => {
		const tree = renderTree([]).toJSON()

		expect(tree).toMatchSnapshot()
	})
})