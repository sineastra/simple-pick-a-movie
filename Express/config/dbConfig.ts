import { Express } from "express"
import mongoose from "mongoose"


export default (app: Express) => {
	return new Promise<void>((resolve, reject) => {
		mongoose.set("runValidators", true)
		mongoose.connect('mongodb+srv://Sineastra:dDW3pGuexpFMLfIr@cluster0.7gv2u.mongodb.net/mkit?retryWrites=true&w=majority')

		const db = mongoose.connection
		db.on("disconnected", (msg: string) => {
			console.log(`Connection terminated. Reason: (${ msg })`)
		})
		db.on("error", (err: { message: string }) => {
			console.log(`Database error: ${ err.message }`)
			reject(err.message)
		})
		db.on("open", () => {
			console.log(`Database connected`)
			resolve()
		})
	})
}