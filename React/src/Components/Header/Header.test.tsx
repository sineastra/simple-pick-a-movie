import renderer from "react-test-renderer"
import Header from "./Header"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "../../_state/app/store"


describe("---> Testing /Components/Header", () => {
	it("snapshot test", () => {
		const tree = renderer.create(
			<Provider store={ store }>
				<BrowserRouter>
					<Header/>,
				</BrowserRouter>,
			</Provider>,
		).toJSON()

		expect(tree).toMatchSnapshot()
	})
})

export {}