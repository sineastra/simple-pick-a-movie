import { Express } from "express"
import userController from "../controllers/userController"
import moviesController from "../controllers/moviesController"
import { arch } from "os"


const routesConfig = (app: Express) => {
	app.use("/api/user", userController)
	app.use("/api/movies", moviesController)
	app.use("/api", (req, res) => {
		res.send("api working")
	})
}

export default routesConfig