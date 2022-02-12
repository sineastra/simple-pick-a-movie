import { Router } from "express"
import userServices from "../db/services/userServices"
import { apiServices } from "../db/services/apiServices"


const router = Router()

router.get("/favourites", async (req, res) => {
	//TODO: Change the user
	const user = await userServices.getUser('620772b331579175679664d1')

	if (user) {
		const favs = await apiServices.getFavs(user.favourites)

		res.json({ status: 'ok', statusCode: 200, data: favs })
	}
})
router.put("/favourites/:movieId", async (req, res) => {
	const user = await userServices.getUser('620772b331579175679664d1')

	if (user) {
		const favIndex = user.favourites.findIndex(x => x === req.params.movieId)

		if (favIndex === -1) {
			user.favourites.push(req.params.movieId)
		} else {
			user.favourites.splice(favIndex, 1)
		}

		await user.save()

		res.json({ status: "ok", statusCode: 200, data: user.favourites })
	}
})

router.get("/notes/:movieId", async (req, res) => {
	const user = await userServices.getUser('620772b331579175679664d1')

	if (user) {
		const note = user.notes.find(x => x.movieId === req.params.movieId)

		res.send({ status: 'ok', statusCode: 200, data: note?.note || null })
	}
})
router.post("/notes/:movieId", async (req, res) => {
	const user = await userServices.getUser('620772b331579175679664d1')

	if (user) {
		const noteIndex = user.notes.findIndex(x => x.movieId === req.params.movieId)

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
	const user = await userServices.getUser('620772b331579175679664d1')

	if (user) {
		const rating = user.ratings.find(x => x.movieId === req.params.movieId)

		res.send({ status: 'ok', statusCode: 200, data: rating?.rating || null })
	}
})
router.post("/ratings/:movieId", async (req, res) => {
	const user = await userServices.getUser('620772b331579175679664d1')

	if (user) {
		const ratingIndex = user.ratings.findIndex(x => x.movieId === req.params.movieId)

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