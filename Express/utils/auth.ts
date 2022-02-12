import jwt from "jsonwebtoken"
import { userInterface } from "../_interfaces/userInterfaces"
import variables from "../config/variables"

const createJWTToken = (user: userInterface) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name
		},
		variables.TOKEN_SECRET,
	)
}

const attachCookie = (token: string, res: any) => {
	return res.cookie(variables.COOKIE_NAME, token, {
		sameSite: "none",
		secure: true,
	})
}

export { createJWTToken, attachCookie }