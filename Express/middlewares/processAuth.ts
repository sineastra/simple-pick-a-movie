import variables from "../config/variables"
import { NextFunction, Response, Request } from "express"
import jwt from "jsonwebtoken"
import { extendedRequestIntF } from "../_interfaces/userInterfaces"



const processAuth = (req: Request, res: Response, next: NextFunction) => {
	const cookieName = variables.COOKIE_NAME
	const token = req.cookies[variables.TOKEN_SECRET]

	if (token) {
		try {
			const userData = jwt.verify(token, variables.TOKEN_SECRET)
			const extendedReq = req as extendedRequestIntF

			console.log(userData)

			extendedReq.user = userData
		} catch (e) {
			res.clearCookie(cookieName)
			res.json({ status: "Unauthorized", statusCode: 401 })

			return false
		}
	}
	next()
}

export default processAuth