import { movieIntF } from "../../_interfaces/movies"
import { render, RenderResult, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import SearchCard from "./SearchCard"
import user from "@testing-library/user-event"
import mocked = jest.mocked


const mockedMovie: movieIntF = {
	externalId: 'a',
	poster: 'b',
	title: 'c',
	genres: ['a', 'b', 'c'],
	runtime: 1,
	officialSite: 'd',
	description: 'e',
}

const updateFavMock = jest.fn(() => {
	console.log('updated')
})

const renderScreen = (movie: movieIntF, favourites: movieIntF[]) =>
	render(
		<BrowserRouter>
			<SearchCard movie={ movie } favourites={ favourites }  updateFav={ updateFavMock }/>
		</BrowserRouter>,
	)

describe("---> Testing output of /Components/SearchCard", () => {
	it("shows correct button when the movie is NOT a favourite", () => {
		renderScreen(mockedMovie, [])
		const btn = screen.getByRole('button')

		expect(btn.textContent).toMatch(/add to favourites/i)
	})
	it("shows correct button when the movie is A favourite", () => {
		renderScreen(mockedMovie, [mockedMovie])
		const btn = screen.getByRole('button')

		expect(btn.textContent).toMatch(/remove from favourites/i)
	})
	it("correctly calls updateFav", async () => {
		renderScreen(mockedMovie, [mockedMovie])
		const btn = screen.getByRole('button')

		await user.click(btn)

		expect(updateFavMock).toHaveBeenCalled()
	})
})