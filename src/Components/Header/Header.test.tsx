import renderer from "react-test-renderer"
import Header from "./Header"
import { BrowserRouter } from "react-router-dom"


describe("---> Testing /Components/Header", () => {
	it("snapshot test", () => {
		const tree = renderer.create(
			<BrowserRouter>
				<Header/>,
			</BrowserRouter>,
		).toJSON()

		expect(tree).toMatchSnapshot()
	})
})

export {}