import { BrowserRouter } from "react-router-dom"
import { act, render, screen } from "@testing-library/react"
import SearchPage from "./SearchPage"
import { addFavourite, removeFavourite } from "../../_state/features/userSlice"
import { Provider } from "react-redux"
import { SearchCardMovieIntF } from "../../_interfaces/movies"
import { movieRequests } from "../../requests/movies"
import user from "@testing-library/user-event"
import store from "../../_state/app/store"


let mockGetSearchReturn: SearchCardMovieIntF[] = []
const mockedSearchMovie: SearchCardMovieIntF = {
	imdbId: 'b',
	poster: 'b',
	title: 'a',
	genres: ['b'],
	runtime: 1,
	officialSite: 'b',
	description: 'b',
}
jest.mock("../../requests/movies", () => {
	return {
		movieRequests: {
			getSearchs: async (s: string) => {
				return mockGetSearchReturn
			},
		},
	}
})

const renderScreen = () => render(
	<Provider store={ store }>
		<BrowserRouter>
			<SearchPage/>
		</BrowserRouter>,
	</Provider>,
)

describe("---> Testing the /Pages/SearchPage network calls", () => {
	let spy: any

	beforeEach(() => {
		spy = jest.spyOn(movieRequests, 'getSearchs')
	})
	afterEach(() => {
		spy.mockRestore()
		mockGetSearchReturn = []
	})

	it("correctly renders when there are no search query", () => {
		renderScreen()
		const noSearch = screen.getByText(/no matches/i)

		expect(noSearch).toBeInTheDocument()
		expect(movieRequests.getSearchs).not.toHaveBeenCalled()
	})
	it("renders correctly when there are no search results", async () => {
		const location = {
			...global.location,
			search: 'q=a',
		}
		Object.defineProperty(global, 'location', {
			writable: true,
			value: location,
		})
		await act(async () => {
			await renderScreen()
		})

		const noSearch = screen.getByText(/no matches/i)

		expect(noSearch).toBeInTheDocument()
		expect(movieRequests.getSearchs).toHaveBeenCalledTimes(1)
	})
	it("renders correctly when there ARE search results", async () => {
		const location = {
			...global.location,
			search: 'q=a',
		}
		Object.defineProperty(global, 'location', {
			writable: true,
			value: location,
		})
		mockGetSearchReturn = [mockedSearchMovie, { ...mockedSearchMovie, imdbId: 'c' }]

		await act(async () => {
			await renderScreen()
		})

		const noSearch = screen.queryByText(/no matches/i)
		const posters = screen.getAllByRole("poster")

		expect(noSearch).not.toBeInTheDocument()
		expect(movieRequests.getSearchs).toHaveBeenCalledTimes(1)
		expect(posters.length).toBe(2)
	})
})

describe("---> Testing /Pages/SearchPage state functionality", () => {
	beforeEach(async () => {
		mockGetSearchReturn = [mockedSearchMovie, { ...mockedSearchMovie, imdbId: 'a' }]

		const location = {
			...global.location,
			search: 'q=a',
		}
		Object.defineProperty(global, 'location', {
			writable: true,
			value: location,
		})

		await act(async () => {
			await store.dispatch(addFavourite('a'))
		})

		await act(async () => {
			await renderScreen()
		})
	})

	afterEach(() => {
		mockGetSearchReturn = []
		store.dispatch(removeFavourite(undefined))
	})

	it("correctly reads redux favourites state and renders with the proper info", async () => {
		const remove = screen.getAllByText(/Remove From Favourites/i)
		const add = screen.getAllByText(/add to Favourites/i)

		expect(remove.length).toBe(1)
		expect(add.length).toBe(1)
	})
	it("correctly adds a favourite to the store", async () => {
		const add = screen.getAllByText(/add to Favourites/i)

		await act(async () => {
			await user.click(add[0])
		})

		const state = store.getState()

		expect(state.userData.favourites).toEqual(['a', 'b'])
	})
	it("correctly removes a favourite from the store", async () => {
		const remove = screen.getAllByText(/Remove From Favourites/i)

		await act(async () => {
			await user.click(remove[0])
		})
		const state = store.getState()

		expect(state.userData.favourites).toEqual([])
	})
})