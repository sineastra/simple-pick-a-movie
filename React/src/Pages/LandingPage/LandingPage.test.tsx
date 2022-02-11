import { BrowserRouter } from "react-router-dom"
import LandingPage from "./LandingPage"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import userReducer, { addFavourite } from "../../_state/features/userSlice"
import { act, render, screen } from "@testing-library/react"
import { movieRequests } from "../../requests/movies"


const mockedMovies = [{
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

const store = configureStore({
	reducer: {
		userData: userReducer,
	},
})

jest.mock("../../requests/movies", () => {
	return {
		movieRequests: {
			getFavs: async (ids: string[]) => {
				return mockedMovies
			},
		},
	}
})

describe("---> Testing the Landing Page", () => {
	beforeEach(() => {
		jest.resetAllMocks()
	})

	it("should render properly based on redux state -> no fav movies", async () => {
		render(
			<Provider store={ store }>
				<BrowserRouter>
					<LandingPage/>
				</BrowserRouter>,
			</Provider>,
		)

		const emptyE = screen.getByRole('no-fav-msg')
		const gridContainer = screen.queryByRole("fav-grid")

		expect(emptyE).toBeInTheDocument()
		expect(gridContainer).toBeNull()
	})
	it("should render properly based on redux state -> existing fav movies", async () => {
		await act(async () => {
			await store.dispatch(addFavourite('a'))
		})

		await act(async () => {
			await render(
				<Provider store={ store }>
					<BrowserRouter>
						<LandingPage/>
					</BrowserRouter>,
				</Provider>,
			)
		})
		const emptyE = screen.queryByRole('no-fav-msg')
		const gridContainer = screen.getByRole("fav-grid")
		const slides = screen.getAllByRole("slide")

		expect(emptyE).toBeNull()
		expect(gridContainer).toBeInTheDocument()
		expect(slides.length).toBe(mockedMovies.length)
	})
})