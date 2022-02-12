import renderer from "react-test-renderer"
import { BrowserRouter } from "react-router-dom"
import Favourites from "./Favourites"
import { movieIntF } from "../../_interfaces/movies"


const renderTree = (movies: movieIntF[]) =>
	renderer.create(
		<BrowserRouter>
			<Favourites favs={ movies }/>
		</BrowserRouter>,
	)
const mockedMovies: movieIntF[] = [{
	externalId: 'a',
	poster: 'b',
	title: 'c',
	genres: ['d', 'e'],
	runtime: 1,
	officialSite: 'b',
	description: 'b',
}, {
	externalId: 'd',
	poster: 'c',
	title: 'b',
	genres: ['a', 'b'],
	runtime: 1,
	officialSite: 'b',
	description: 'b',
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