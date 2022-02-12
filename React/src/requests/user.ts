import { movieIntF } from "../_interfaces/movies"
import { abstractJSONRequest, abstractRequest } from "./abstractRequests"


interface authReturnIntF {
	status?: string,
	statusCode?: number,
	errors?: string[],
	token?: string,
}

interface userRequestsIntF {
	getFavs: () => Promise<movieIntF[]>,
	updateFav: (s: string) => Promise<movieIntF[]>,
	updateNote: (id: string, note: string) => void,
	updateRating: (id: string, rating: number) => void,
	signIn: (f: { name: string, password: string }) => Promise<authReturnIntF>,
	register: (f: { name: string, password: string }) => Promise<authReturnIntF>,
	getMovieDetailsForUser: (id: string) => Promise<{ rating: number | null, note: string | null }>,
}
const userRequests: userRequestsIntF = {
	getFavs: async () =>
		await abstractRequest({ uri: '/user/favourites' }),
	getMovieDetailsForUser: async (movieId) => {
		const [note, rating] = await Promise.all([
			abstractRequest({ uri: `/user/notes/${ movieId }` }),
			abstractRequest({ uri: `/user/ratings/${ movieId }` }),
		])
		return { rating, note }
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
	updateFav: async (movieId): Promise<movieIntF[]> =>
		await abstractJSONRequest({ uri: `/user/favourites/${ movieId }`, body: { imdbId: movieId }, method: 'PUT' }),
}

export { userRequests }