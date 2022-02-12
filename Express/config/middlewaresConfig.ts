import { Express } from "express"
import processAuth from "../middlewares/processAuth"

const middlewaresConfig = (app: Express) => {
	app.use(processAuth)
}

export default middlewaresConfig