import { FavCardMovieIntF, SearchCardMovieIntF } from "../_interfaces/movies"
import { baseAPIRequest } from "./baseRequest"


const getDetailedInfo = (movie: any): SearchCardMovieIntF => {
	return {
		imdbId: movie.externals.imdb,
		poster: movie.image.medium,
		title: movie.name,
		genres: movie.genres,
		runtime: movie.runtime,
		officialSite: movie.officialSite,
		description: movie.summary,
	}
}

interface moviesRequestsIntF {
	getFavs: (ids: string[]) => Promise<FavCardMovieIntF[]>,
	getSearchs: (query: string) => Promise<SearchCardMovieIntF[]>,
	getDetails: (id: string) => Promise<SearchCardMovieIntF>
}
const movieRequests: moviesRequestsIntF = {
	getFavs: async (ids) => {
		const fetchReq = async (id: string): Promise<FavCardMovieIntF> => {
			const movieData = await baseAPIRequest(`/lookup/shows?imdb=${ id }`)

			return {
				imdbId: movieData.externals.imdb,
				poster: movieData.image.medium,
				title: movieData.name,
				genres: movieData.genres,
			}
		}
		const promises = ids.map(fetchReq)
		const movies: FavCardMovieIntF[] = await Promise.all(promises)

		return movies
	},
	getSearchs: async (query) => {
		const movieData = await baseAPIRequest(`/search/shows?q=${ query }`)
		const movies: SearchCardMovieIntF[] = movieData.map((x: any) => {
			return getDetailedInfo(x)
		})

		return movies
	},
	getDetails: async (id) => {
		const movieData = await baseAPIRequest(`/lookup/shows?imdb=${ id }`)

		return getDetailedInfo(movieData)
	},
}

export { movieRequests }