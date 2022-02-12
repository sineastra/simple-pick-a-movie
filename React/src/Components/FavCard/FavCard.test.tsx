import { movieIntF } from "../../_interfaces/movies"
import renderer from "react-test-renderer"
import { BrowserRouter } from "react-router-dom"
import SingleGridMovie from "./FavCard"


const mockedMovie: movieIntF = {
	externalId: 'a',
	poster: 'b',
	title: 'c',
	genres: ['d', 'e'],
	runtime: 1,
	officialSite: 'b',
	description: 'b',
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