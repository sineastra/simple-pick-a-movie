import express, { Express } from "express"
import mainConfig from "./config/mainConfig"


const app = express()

const start = async (app: Express) => {
	const port = 3030

	await mainConfig(app)

	app.listen(port, () => console.log(`Listening on port ${ port }`))
}

start(app)