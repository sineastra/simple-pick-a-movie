import { act, cleanup, render, screen } from "@testing-library/react"
import store from "../../_state/app/store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import DetailsPage from "./DetailsPage"
import { changeUser } from "../../_state/features/userSlice"
import user from "@testing-library/user-event"
import { movieDetailsForUserIntF, movieIntF } from "../../_interfaces/movies"
import { userRequests } from "../../requests/user"


let mockedGetDetails: movieIntF
let mockedMovieDetailsReturn: movieDetailsForUserIntF
let mockedGetFavsReturn: movieIntF[]
let mockedUpdateFavsReturn: movieIntF[]

const baseMockedMovie: movieIntF = {
	externalId: 'a',
	poster: 'b',
	title: 'b',
	genres: ['b'],
	runtime: 1,
	officialSite: 'b',
	description: 'b',
}

jest.mock("../../requests/user", () => {
	return {
		userRequests: {
			getMovieDetailsForUser: jest.fn(() => mockedMovieDetailsReturn),
			getFavs: jest.fn(() => mockedGetFavsReturn),
			updateFavs: jest.fn(() => mockedUpdateFavsReturn),
			updateNote: jest.fn(() => {}),
		},
	}
})
jest.mock("../../requests/movies", () => {
	return {
		movieRequests: {
			getDetails: jest.fn(() => mockedGetDetails),
		},
	}
})
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({
		id: 'a',
	}),
}))

const renderScreen = () => render(
	<Provider store={ store }>
		<BrowserRouter>
			<DetailsPage/>
		</BrowserRouter>,
	</Provider>,
)

describe("---> Testing /Pages/DetailsPage functionality", () => {
	beforeAll(() => {
		act(() => { store.dispatch(changeUser({ _id: '1', name: 'a' })) })

		mockedGetDetails = baseMockedMovie
		mockedMovieDetailsReturn = { rating: 0, notes: '' }
		mockedGetFavsReturn = []
	})

	beforeEach(() => {
		jest.clearAllMocks()
	})

	// it("correctly updates favourites on user interaction", async () => {
	// 	mockedUpdateFavsReturn = [baseMockedMovie]
	//
	// 	await act(async () => {
	// 		await renderScreen()
	// 	})
	// 	let favBtnAdd = screen.queryByText(/add to favourites/i)
	// 	let favBtnRemove = screen.queryByText(/remove from favourites/i)
	//
	// 	expect(favBtnAdd).toBeInTheDocument()
	// 	expect(favBtnRemove).toBeNull()
	//
	// 	await act(async () => {
	// 		favBtnAdd && await user.click(favBtnAdd)
	// 	})
	//
	// 	favBtnAdd = screen.queryByText(/add to favourites/i)
	// 	favBtnRemove = screen.queryByText(/remove from favourites/i)
	//
	// 	expect(favBtnAdd).toBeNull()
	// 	expect(favBtnRemove).toBeInTheDocument()
	// })
	//
	// it("correctly updates notes on user interaction", async () => {
	// 	await act(async () => {
	// 		await renderScreen()
	// 	})
	//
	// 	const textarea: HTMLTextAreaElement = screen.getByRole('textbox')
	//
	// 	await user.type(textarea, 'a')
	//
	// 	jest.useFakeTimers()
	// 	jest.advanceTimersByTime(2000)
	//
	// 	expect(textarea.value).toBe('a')
	// 	expect(userRequests.getMovieDetailsForUser).toHaveBeenCalledTimes(1)
	// })
})