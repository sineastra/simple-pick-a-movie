import { BrowserRouter } from "react-router-dom"
import { act, render, screen } from "@testing-library/react"
import SearchPage from "./SearchPage"
import { Provider } from "react-redux"
import { movieRequests } from "../../requests/movies"
import user from "@testing-library/user-event"
import store from "../../_state/app/store"
import { movieIntF } from "../../_interfaces/movies"


let mockGetSearchReturn: movieIntF[] = []
let mockUpdateFavReturn: movieIntF[] = []
let mockGetFavsReturn: movieIntF[] = []

const mockedSearchMovie: movieIntF = {
	externalId: 'b',
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
			getSearchs: (s: string) => {
				return mockGetSearchReturn
			},
		},
	}
})
jest.mock("../../requests/user", () => {
	return {
		userRequests: {
			updateFav: (s: string) => {
				const index = mockUpdateFavReturn.findIndex(x => x.externalId === s)

				if (index !== -1) {
					return mockUpdateFavReturn.splice(index, 1)
				} else {
					mockUpdateFavReturn.push({ ...mockedSearchMovie, externalId: s })
				}
			},
			getFavs: () => {
				return mockGetFavsReturn
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
		global.location.search = ''
	})

	it("correctly renders when there are no search query", () => {
		renderScreen()
		const noSearch = screen.getByText(/no matches/i)

		expect(noSearch).toBeInTheDocument()
		expect(movieRequests.getSearchs).not.toHaveBeenCalled()
	})
	it("renders correctly when there are no search results", async () => {
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
		mockGetSearchReturn = [mockedSearchMovie, { ...mockedSearchMovie, externalId: 'c' }]

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