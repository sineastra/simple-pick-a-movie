import { movieDetailsForUserIntF, movieIntF } from "../_interfaces/movies"
import { abstractJSONRequest, abstractRequest } from "./abstractRequests"


interface userRequestsIntF {
	getFavs: () => Promise<movieIntF[]>,
	updateFavs: (s: string) => Promise<movieIntF[]>,
	updateNote: (id: string, note: string) => void,
	updateRating: (id: string, rating: number) => void,
	signIn: (f: { name: string, password: string }) => Promise<{ token: string }>,
	register: (f: { name: string, password: string }) => Promise<{ token: string }>,
	getMovieDetailsForUser: (id: string) => Promise<movieDetailsForUserIntF>,
	logout: () => void
}
const userRequests: userRequestsIntF = {
	getFavs: async () =>
		await abstractRequest({ uri: '/user/favourites' }),
	getMovieDetailsForUser: async (movieId) => {
		const [notes, rating] = await Promise.all([
			abstractRequest({ uri: `/user/notes/${ movieId }` }),
			abstractRequest({ uri: `/user/ratings/${ movieId }` }),
		])
		return { rating, notes }
	},
	signIn: async (formData) =>
		await abstractJSONRequest({ uri: `/user/sign-in`, body: { ...formData } }),
	register: async (formData) =>
		await abstractJSONRequest({ uri: `/user/register`, body: { ...formData } }),
	updateNote: async (movieId, note) => {
		await abstractJSONRequest({ uri: `/user/notes/${ movieId }`, body: { note } })
	},
	updateRating: async (movieId, rating) => {
		await abstractJSONRequest({ uri: `/user/ratings/${ movieId }`, body: { rating } })
	},
	updateFavs: async (movieId): Promise<movieIntF[]> =>
		await abstractJSONRequest({ uri: `/user/favourites/${ movieId }`, body: { imdbId: movieId } }),
	logout: async () => {
		await abstractRequest({ uri: "/user/logout", method: 'DELETE' })
	},
}

export { userRequests }