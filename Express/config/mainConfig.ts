import { Express } from "express"
import dbConfig from "./dbConfig"
import expressConfig from "./expressConfig"
import middlewaresConfig from "./middlewaresConfig"
import routesConfig from "./routesConfig"


const mainConfig = async (app: Express) => {
	try {
		await dbConfig(app)

		expressConfig(app)
		middlewaresConfig(app)
		routesConfig(app)
	} catch (e) {
		console.log(e)
	}
}

export default mainConfig