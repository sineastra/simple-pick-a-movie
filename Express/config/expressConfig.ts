import express, { Express } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


const corsOptions = {
	origin: ["http://localhost:3000"],
	credentials: true,
}

const expressConfig = (app: Express) => {
	app.use(express.static("static"))
	app.use(cors(corsOptions))
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	app.use(cookieParser())
}

export default expressConfig