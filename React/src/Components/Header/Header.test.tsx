import renderer from "react-test-renderer"
import Header from "./Header"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "../../_state/app/store"
import { changeUser } from "../../_state/features/userSlice"


describe("---> Testing /Components/Header", () => {
	store.dispatch(changeUser({ _id: '1', name: 'a' }))

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