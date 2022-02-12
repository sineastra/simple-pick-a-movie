import UserModel from "../models/UserModel"
import { userInterface } from "../../_interfaces/userInterfaces"


interface userServicesIntF {
	getById: (id: string) => Promise<any>,
	getByName: (n: string) => Promise<userInterface | null>,
	createNew: (n: userInterface) => Promise<userInterface>
}
const userServices: userServicesIntF = {
	getById: async (userId) =>
		await UserModel.findById(userId),
	getByName: async (name) =>
		await UserModel.findOne({ name }),
	createNew: async (user) =>
		await new UserModel(user).save()
}

export default userServices