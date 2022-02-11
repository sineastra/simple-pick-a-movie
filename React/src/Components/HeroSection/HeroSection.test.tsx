import renderer from "react-test-renderer"
import HeroSection from "./HeroSection"
import { BrowserRouter } from "react-router-dom"


describe("---> Testing /Components/HeroSection", () => {
	it("snapshot test", () => {
		const tree = renderer.create(
			<BrowserRouter>
				<HeroSection/>,
			</BrowserRouter>,
		).toJSON()

		expect(tree).toMatchSnapshot()
	})
})