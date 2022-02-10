import { FavCardMovieIntF } from "../../_interfaces/movies"
import renderer from "react-test-renderer"
import { BrowserRouter } from "react-router-dom"
import SingleGridMovie from "./FavCard"


const mockedMovie: FavCardMovieIntF = {
	imdbId: 'a',
	poster: 'b',
	title: 'c',
	genre: 'd',
}

describe("---> Testing /Components/FavCard", () => {
	it("snapshot test", () => {
		const tree = renderer.create(
			<BrowserRouter>
				<SingleGridMovie movie={ mockedMovie }/>
			</BrowserRouter>,
		).toJSON()

		expect(tree).toMatchSnapshot()
	})
})