import { act, fireEvent, getByTitle, render, screen } from "@testing-library/react"
import store from "../../_state/app/store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import DetailsPage from "./DetailsPage"
import { movieRequests } from "../../requests/movies"
import user from "@testing-library/user-event"
import { movieInteractionIntF } from "../../_interfaces/state"
import RatingStars from "../../Components/RatingStars/RatingStars"
import exp from "constants"
import { movieIntF } from "../../_interfaces/movies"


const renderScreen = () => render(
	<Provider store={ store }>
		<BrowserRouter>
			<DetailsPage/>
		</BrowserRouter>,
	</Provider>,
)
const mockedSearchMovie: movieIntF = {
	externalId: 'a',
	poster: 'b',
	title: 'b',
	genres: ['b'],
	runtime: 1,
	officialSite: 'b',
	description: 'b',
}
const mockedInitialRating: movieInteractionIntF = {
	_id: 'a',
	rating: 0,
	privateComment: '',
}
jest.mock("../../requests/movies", () => {
	return {
		movieRequests: {
			getDetails: async (s: string) => {
				return mockedSearchMovie
			},
		},
	}
})
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({
		id: 'a',
	}),
}))

describe("---> Testing /Pages/DetailsPage functionality", () => {
	let spy: any

	beforeEach(async () => {
		spy = jest.spyOn(movieRequests, 'getDetails')
		// store.dispatch(addRating(mockedInitialRating))
	})

	afterEach(() => {
		spy.mockRestore()
	})

	it("correctly reads redux favourites state and renders with the proper info", async () => {
		await act(async () => {
			await renderScreen()
		})

		const remove = screen.getByText(/Remove From Favourites/i)

		expect(remove).toBeInTheDocument()
		expect(movieRequests.getDetails).toHaveBeenCalledTimes(1)
	})
	it("correctly adds a favourite to the store", async () => {
		await act(async () => {
			await renderScreen()
		})

		const add = screen.getByText(/add to Favourites/i)
		await user.click(add)
		const state = store.getState()

		expect(state).toEqual(['a'])
	})
	it("correctly removes a favourite from the store", async () => {
		await act(async () => {
			await renderScreen()
		})

		const remove = screen.getByText(/Remove From Favourites/i)
		await user.click(remove)
		const state = store.getState()

		expect(state).toEqual([])
	})
	it("correctly updates private comment redux state", async () => {
		await act(async () => {
			await renderScreen()
		})
		const textbox = screen.getByRole('textbox')
		await user.type(textbox, '{a}')
		const state = store.getState()

		expect('a').toBe('b')
		// expect(state.userData.ratings[0].privateComment).toBe('a')
	})
})