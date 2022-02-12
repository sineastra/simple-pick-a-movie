import UserModel from "../models/UserModel"


const userServices = {
	logIn: () => {},
	logOff: () => {},
	getUser: async (userId: string) =>
		await UserModel.findById(userId),
	addFav: () => {},
	removeFav: () => {},
}

export default userServices