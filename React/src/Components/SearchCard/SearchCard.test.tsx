import { movieIntF } from "../../_interfaces/movies"
import { render, RenderResult, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import SearchCard from "./SearchCard"
import user from "@testing-library/user-event"


const mockedMovie: movieIntF = {
	externalId: 'a',
	poster: 'b',
	title: 'c',
	genres: ['a', 'b', 'c'],
	runtime: 1,
	officialSite: 'd',
	description: 'e',
}

const addFavMock = jest.fn(() => {
	console.log('added')
})
const removeFavMock = jest.fn(() => {
	console.log('removed')
})

const renderScreen = (movie: movieIntF, favourites: string[]) =>
	render(
		<BrowserRouter>
			<SearchCard movie={ movie } favourites={ favourites } addFav={ addFavMock } removeFav={ removeFavMock }/>
		</BrowserRouter>,
	)

describe("---> Testing output of /Components/SearchCard", () => {
	it("shows correct button when the movie is NOT a favourite", () => {
		renderScreen(mockedMovie, [])
		const btn = screen.getByRole('button')

		expect(btn.textContent).toMatch(/add to favourites/i)
	})
	it("shows correct button when the movie is A facourite", () => {
		renderScreen(mockedMovie, ['a'])
		const btn = screen.getByRole('button')

		expect(btn.textContent).toMatch(/remove from favourites/i)
	})
	it("correctly calls addFav", async () => {
		renderScreen(mockedMovie, [])
		const btn = screen.getByRole('button')

		await user.click(btn)

		expect(addFavMock).toHaveBeenCalled()
	})
	it("correctly calls removeFav", async () => {
		renderScreen(mockedMovie, ['a'])
		const btn = screen.getByRole('button')

		await user.click(btn)

		expect(removeFavMock).toHaveBeenCalled()
	})
})