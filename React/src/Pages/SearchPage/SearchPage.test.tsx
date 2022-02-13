import { BrowserRouter } from "react-router-dom"
import { act, render, screen } from "@testing-library/react"
import SearchPage from "./SearchPage"
import { Provider } from "react-redux"
import { movieRequests } from "../../requests/movies"
import store from "../../_state/app/store"
import { movieIntF } from "../../_interfaces/movies"
import { changeUser } from "../../_state/features/userSlice"


let mockedGetSearchReturn: movieIntF[] = []
let mockedUpdateFavsReturn: movieIntF[]
let mockedGetFavsReturn: movieIntF[]

jest.mock("../../requests/movies", () => {
	return {
		movieRequests: {
			getSearchs: jest.fn(() => mockedGetSearchReturn)
		},
	}
})
jest.mock("../../requests/user", () => {
	return {
		userRequests: {
			updateFavs: jest.fn(() => mockedUpdateFavsReturn),
			getFavs: jest.fn(() => mockedGetFavsReturn),
		},
	}
})

const baseMockedMovie: movieIntF = {
	externalId: 'b',
	poster: 'b',
	title: 'a',
	genres: ['b'],
	runtime: 1,
	officialSite: 'b',
	description: 'b',
}

const renderScreen = () => render(
	<Provider store={ store }>
		<BrowserRouter>
			<SearchPage/>
		</BrowserRouter>,
	</Provider>,
)

describe("---> Testing the /Pages/SearchPage network calls", () => {
	beforeAll(() => {
		act(() => { store.dispatch(changeUser({ _id: '1', name: 'a' })) })

		mockedGetFavsReturn = []
	})
	beforeEach(() => {
		jest.clearAllMocks()
		global.location.search = ''
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
		mockedGetSearchReturn = [baseMockedMovie]

		await act(async () => {
			await renderScreen()
		})

		const noSearch = screen.queryByText(/no matches/i)
		const posters = screen.getAllByRole("poster")

		expect(noSearch).not.toBeInTheDocument()
		expect(movieRequests.getSearchs).toHaveBeenCalledTimes(1)
		expect(posters.length).toBe(1)
	})
})