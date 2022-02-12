import { Express } from "express"
import userController from "../controllers/userController"
import moviesController from "../controllers/moviesController"


const routesConfig = (app: Express) => {
	app.use("/api/user", userController)
	app.use("/api/movies", moviesController)
}

export default routesConfig