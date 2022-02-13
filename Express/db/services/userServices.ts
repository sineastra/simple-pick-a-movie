import UserModel from "../models/UserModel"
import { baseUserInterface, userInterface } from "../../_interfaces/userInterfaces"


interface userServicesIntF {
	getById: (id: string) => Promise<any>,
	getByName: (n: string) => Promise<userInterface | null>,
	createNew: (n: baseUserInterface) => Promise<userInterface>,
	updateUser: (id: string, u: userInterface) => Promise<userInterface | null>,
}
const userServices: userServicesIntF = {
	getById: async (userId) =>
		await UserModel.findById(userId),
	getByName: async (name) =>
		await UserModel.findOne({ name }),
	createNew: async (user) =>
		await new UserModel(user).save(),
	updateUser: async (id, user) =>
		await UserModel.findByIdAndUpdate(id, user),
}

export default userServices