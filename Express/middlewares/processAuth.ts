import variables from "../config/variables"
import { NextFunction, Response, Request } from "express"
import jwt from "jsonwebtoken"
import { extendedRequestIntF, requestUserIntF } from "../_interfaces/userInterfaces"



const processAuth = (req: Request, res: Response, next: NextFunction) => {
	const cookieName = variables.COOKIE_NAME
	const token = req.cookies[cookieName]

	if (token) {
		try {
			const userData = jwt.verify(token, variables.TOKEN_SECRET)
			const extendedReq = req as extendedRequestIntF

			extendedReq.user = userData as requestUserIntF
		} catch (e) {
			res.clearCookie(cookieName)
			res.json({ status: "Unauthorized", statusCode: 401 })

			return false
		}
	}
	next()
}

export default processAuth