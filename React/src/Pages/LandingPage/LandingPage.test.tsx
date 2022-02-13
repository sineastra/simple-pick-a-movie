import { configureStore } from "@reduxjs/toolkit"
import userReducer, { changeUser } from "../../_state/features/userSlice"
import renderer from "react-test-renderer"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import LandingPage from "./LandingPage"
import { movieIntF } from "../../_interfaces/movies"

const baseMockedMovie: movieIntF = {
	externalId: 'a',
	poster: 'b',
	title: 'b',
	genres: ['b'],
	runtime: 1,
	officialSite: 'b',
	description: 'b',
}
let mockedMovies: movieIntF[] = []

const store = configureStore({
	reducer: {
		userData: userReducer,
	},
})

jest.mock("../../requests/movies", () => {
	return {
		movieRequests: {
			getFavs: jest.fn(() => mockedMovies),
		},
	}
})

describe("---> Testing the Landing Page", () => {
	const renderTree = () => renderer.create(
		<Provider store={ store }>
			<BrowserRouter>
				<LandingPage/>
			</BrowserRouter>
		</Provider>,
	).toJSON()

	beforeAll(() => {
		store.dispatch(changeUser({ _id: '1', name: 'a' }))
	})

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("snapshot test -> renders correctly with no favourites", () => {
		const view = renderTree()

		expect(view).toMatchSnapshot()
	})
	it("snapshot test -> renders correctly WITH favourites", () => {
		mockedMovies = [baseMockedMovie]
		const view = renderTree()

		expect(view).toMatchSnapshot()
	})
})