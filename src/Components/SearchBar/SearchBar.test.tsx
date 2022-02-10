import renderer from "react-test-renderer"
import { BrowserRouter } from "react-router-dom"
import SearchBar from "./SearchBar"
import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const generateData = () => {
	render(
		<BrowserRouter>
			<SearchBar/>
		</BrowserRouter>,
	)

	return screen.getByRole('searchbox') as HTMLInputElement
}

const simulateInputSubmit = async (keyboardSubmit: boolean) => {
	const user = userEvent.setup()
	const searchInput = generateData()
	const searchBtn = screen.getByText('Search')

	await user.type(searchInput, 'a')
	await act(() => {
		return keyboardSubmit ? user.keyboard('{Enter}') : user.click(searchBtn)
	})

	const searchParam = global.location.search

	return { searchParam, searchInput }
}


describe("---> Testing /Components/SearchBar", () => {
	it("snapshot test", () => {
		const tree = renderer.create(
			<BrowserRouter>
				<SearchBar/>
			</BrowserRouter>,
		).toJSON()

		expect(tree).toMatchSnapshot()
	})
	it("should navigate to the proper URL on submit with Enter", async () => {
		const { searchParam } = await simulateInputSubmit(true)

		expect(searchParam).toEqual('?q=a')
	})

	it("should navigate to the proper URL on submit with Click on the Search Icon", async () => {
		const { searchParam } = await simulateInputSubmit(false)

		expect(searchParam).toEqual('?q=a')
	})
	it("should clear input on submit with Enter", async () => {
		const { searchInput } = await simulateInputSubmit(true)

		expect(searchInput.value).toEqual('')
	})
	it("should clear input on submit with Enter", async () => {
		const { searchInput } = await simulateInputSubmit(false)

		expect(searchInput.value).toEqual('')
	})
})