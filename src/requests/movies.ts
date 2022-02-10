import { FavCardMovieIntF } from "../_interfaces/movies"
import { baseAPIRequest } from "./baseRequest"


interface moviesRequestsIntF {
	getFavs: (ids: string[]) => Promise<FavCardMovieIntF[]>
}

const movieRequests: moviesRequestsIntF = {
	getFavs: async (ids: string[]) => {
		const fetchCall = async (id: string): Promise<FavCardMovieIntF> => {
			const {
				imdbId,
				poster,
				title,
				genre,
			}: FavCardMovieIntF = await baseAPIRequest(`/lookup/shows?imdb=${ id }`)

			return { imdbId, poster, title, genre }
		}
		const promises = ids.map(fetchCall)
		const movies: FavCardMovieIntF[] = await Promise.all(promises)

		return movies
	},
}

export { movieRequests }