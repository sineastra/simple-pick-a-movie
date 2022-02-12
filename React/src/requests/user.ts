import { movieIntF } from "../_interfaces/movies"
import { abstractJSONRequest, abstractRequest } from "./abstractRequests"


interface userRequestsIntF {
	getFavs: () => Promise<movieIntF[]>,
	getMovieDetailsForUser: (id: string) => Promise<{ rating: number | null, note: string | null }>,
	updateFav: (s: string) => void,
	updateNote: (id: string, note: string) => void,
	updateRating: (id: string, rating: number) => void,
}
const userRequests: userRequestsIntF = {
	getFavs: async () =>
		await abstractRequest({ uri: '/user/favourites' }),
	updateFav: async (movieId) => {
		await abstractJSONRequest({ uri: `/user/favourites/${ movieId }`, body: { imdbId: movieId }, method: 'PUT' })
	},
	updateNote: async (movieId, note) => {
		await abstractJSONRequest({ uri: `/user/notes/${ movieId }`, body: { note } })
	},
	updateRating: async (movieId, rating) => {
		await abstractJSONRequest({ uri: `/user/ratings/${ movieId }`, body: { rating } })
	},
	getMovieDetailsForUser: async (movieId) => {
		const [note, rating] = await Promise.all([
			abstractRequest({ uri: `/user/notes/${ movieId }` }),
			abstractRequest({ uri: `/user/ratings/${ movieId }` }),
		])

		return { rating, note }
	},
}

export { userRequests }