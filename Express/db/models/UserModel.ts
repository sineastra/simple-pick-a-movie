import mongoose from "mongoose"
import { userInterface } from "../../_interfaces/userInterfaces"


const UserSchema = new mongoose.Schema<userInterface>({
	name: String,
	hashedPassword: String,
	favourites: [{ type: String, default: [] }],
	notes: [
		{
			type: {
				movieId: String,
				note: String,
			},
			default: [],
		},
	],
	ratings: [
		{
			type: {
				movieId: String,
				rating: Number,
			},
			default: [],
		},
	],
})

const UserModel = mongoose.model<userInterface>("User", UserSchema)

export default UserModel