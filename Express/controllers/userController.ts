import { Router, Request, Response, NextFunction } from "express"
import userServices from "../db/services/userServices"
import { apiServices } from "../db/services/apiServices"
import { attachCookie, createJWTToken } from "../utils/auth"
import {
	extendedRequestIntF,
	noteType,
	ratingType,
	userInterface,
} from "../_interfaces/userInterfaces"
import variables from "../config/variables"


const router = Router()

const getUser = async (req: Request, res: Response): Promise<userInterface> => {
	const extendedRequest = req as extendedRequestIntF

	if (!extendedRequest.user) {
		res.json({ status: "Unauthorized", statusCode: 401 })
	}

	return await userServices.getById(extendedRequest.user._id)
}

// Basic Login and Register with No hashing and any security whatsoever, enough for the demo.
const signIn = async (req: Request, res: Response) => {
	const user = await userServices.getByName(req.body.name)

	if (user && user.password === req.body.password) {
		const token = createJWTToken(user)

		attachCookie(token, res)

		res.json({ ok: true, status: 200, statusCode: "OK", data: { token } })
	} else {
		res.json({
			status: "Unauthorized",
			statusCode: 401,
			softError: true,
			errors: [{ msg: "Wrong user email and/or password." }],
		})
	}
}
const register = async (req: Request, res: Response, next: NextFunction) => {
	const isExisting = await userServices.getByName(req.body.name)

	if (isExisting === null) {
		const newUser = {
			name: req.body.name,
			password: req.body.password,
			favourites: [],
			notes: [],
			ratings: [],
		}

		await userServices.createNew(newUser)

		next()
	} else {
		res.json({
			status: "Conflict",
			statusCode: 409,
			softError: true,
			errors: [{ msg: "Existing user. Please sign in." }],
		})
	}
}

// Auth Endpoints
router.post("/register", register, signIn)
router.post("/sign-in", signIn)
router.delete("/logout", (req, res) => {
	res.clearCookie(variables.COOKIE_NAME)

	res.json({ ok: true, status: 200, statusText: "ok", data: null })
})

// Favourites Endpoint
router.get("/favourites", async (req, res) => {
	const user = await getUser(req, res)
	const favs = await apiServices.getFavs(user.favourites)

	res.json({ status: 'ok', statusCode: 200, data: favs })
})
router.post("/favourites/:movieId", async (req, res) => {
	const user = await getUser(req, res)
	const favIndex = user.favourites.findIndex((x: string) => x === req.params.movieId)

	if (favIndex === -1) {
		user.favourites.push(req.params.movieId)
	} else {
		user.favourites.splice(favIndex, 1)
	}
	await userServices.updateUser(user._id, user)

	const favs = await apiServices.getFavs(user.favourites)

	res.json({ status: "ok", statusCode: 200, data: favs })

})

// Notes Endpoint
router.get("/notes/:movieId", async (req, res) => {
	const user = await getUser(req, res)
	const { note } = user.notes.find((x: noteType) => x.movieId === req.params.movieId) || { note: '' }

	res.send({ status: 'ok', statusCode: 200, data: note })

})
router.post("/notes/:movieId", async (req, res) => {
	const user = await getUser(req, res)
	const noteIndex = user.notes.findIndex((x: noteType) => x.movieId === req.params.movieId)

	if (noteIndex !== -1) {
		user.notes[noteIndex].note = req.body.note
	} else {
		user.notes.push({ movieId: req.params.movieId, note: req.body.note })
	}

	await userServices.updateUser(user._id, user)

	res.json({ status: "ok", statusCode: 200, data: user })

})

// Ratings Endpoint
router.get("/ratings/:movieId", async (req, res) => {
	const user = await getUser(req, res)
	const { rating } = user.ratings.find((x: ratingType) => x.movieId === req.params.movieId) || { rating: 0 }

	res.send({ status: 'ok', statusCode: 200, data: rating })
})
router.post("/ratings/:movieId", async (req, res) => {
	const user = await getUser(req, res)
	const ratingIndex = user.ratings.findIndex((x: ratingType) => x.movieId === req.params.movieId)

	if (ratingIndex !== -1) {
		user.ratings[ratingIndex].rating = req.body.rating
	} else {
		user.ratings.push({ movieId: req.params.movieId, rating: req.body.rating })
	}
	await userServices.updateUser(user._id, user)

	res.json({ status: "ok", statusCode: 200, data: user })

})

export default router