import { Router } from "express"
import { apiServices } from "../db/services/apiServices"


const router = Router()

router.get('/', async (req, res) => {
	if (req.query && req.query.q && req.query.q !== '') {
		const data = await apiServices.getSearchs(req.query.q as string)

		res.json({ status: 'ok', statusCode: 200, data })
	} else {
		res.json({ status: 'No Content', statusCode: 204, data: null })
	}
})
router.get('/:id', async (req, res) => {
	const movie = await apiServices.getDetails(req.params.id)

	res.json({ status: 'ok', statusCode: 200, data: movie })
})

export default router
