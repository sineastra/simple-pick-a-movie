import { Router, Request, Response, NextFunction } from "express"
import userServices from "../db/services/userServices"
import { apiServices } from "../db/services/apiServices"
import { attachCookie, createJWTToken } from "../utils/auth"
import { extendedRequestIntF, noteType, ratingType } from "../_interfaces/userInterfaces"


const router = Router()

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
			errors: [{ msg: "Existing user. Please sign in." }],
		})
	}
}

router.post("/register", register, signIn)
router.post("/sign-in", signIn)

router.get("/favourites", async (req, res) => {
	//TODO: Change the user
	const user = await userServices.getById('620772b331579175679664d1')

	if (user) {
		const favs = await apiServices.getFavs(user.favourites)

		res.json({ status: 'ok', statusCode: 200, data: favs })
	}
})
router.put("/favourites/:movieId", async (req, res) => {
	const user = await userServices.getById('620772b331579175679664d1')

	if (user) {
		const favIndex = user.favourites.findIndex((x: string) => x === req.params.movieId)

		if (favIndex === -1) {
			user.favourites.push(req.params.movieId)
		} else {
			user.favourites.splice(favIndex, 1)
		}

		await user.save()
		const favs = await apiServices.getFavs(user.favourites)

		res.json({ status: "ok", statusCode: 200, data: favs })
	}
})

router.get("/notes/:movieId", async (req, res) => {
	const user = await userServices.getById('620772b331579175679664d1')

	if (user) {
		const note = user.notes.find((x: noteType) => x.movieId === req.params.movieId)

		res.send({ status: 'ok', statusCode: 200, data: note?.note || null })
	}
})
router.post("/notes/:movieId", async (req, res) => {
	const user = await userServices.getById('620772b331579175679664d1')

	if (user) {
		const noteIndex = user.notes.findIndex((x: noteType) => x.movieId === req.params.movieId)

		if (noteIndex !== -1) {
			user.notes[noteIndex].note = req.body.note
		} else {
			user.notes.push({ movieId: req.params.movieId, note: req.body.note })
		}

		await user.save()

		res.json({ status: "ok", statusCode: 200, data: user })
	}
})

router.get("/ratings/:movieId", async (req, res) => {
	const user = await userServices.getById('620772b331579175679664d1')

	if (user) {
		const rating = user.ratings.find((x: ratingType) => x.movieId === req.params.movieId)

		res.send({ status: 'ok', statusCode: 200, data: rating?.rating || null })
	}
})
router.post("/ratings/:movieId", async (req, res) => {
	const user = await userServices.getById('620772b331579175679664d1')

	if (user) {
		const ratingIndex = user.ratings.findIndex((x: ratingType) => x.movieId === req.params.movieId)

		if (ratingIndex !== -1) {
			user.ratings[ratingIndex].rating = req.body.rating
		} else {
			user.ratings.push({ movieId: req.params.movieId, rating: req.body.rating })
		}

		await user.save()

		res.json({ status: "ok", statusCode: 200, data: user })
	}
})

export default router