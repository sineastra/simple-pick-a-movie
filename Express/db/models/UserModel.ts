import mongoose from "mongoose"
import { userInterface } from "../../_interfaces/userInterfaces"


const UserSchema = new mongoose.Schema<userInterface>({
	name: String,
	password: String,
	favourites: [{ type: String, default: [] }],
	notes: [
		{
			type: {
				movieId: String,
				note: String,
				default: '',
			},
			default: [],
		},
	],
	ratings: [
		{
			type: {
				movieId: String,
				rating: Number,
				default: 0,
			},
			default: [],
		},
	],
})

const UserModel = mongoose.model<userInterface>("User", UserSchema)

export default UserModel