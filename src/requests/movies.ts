import { FavCardMovieIntF, SearchCardMovieIntF } from "../_interfaces/movies"
import { baseAPIRequest } from "./baseRequest"


interface moviesRequestsIntF {
	getFavs: (ids: string[]) => Promise<FavCardMovieIntF[]>,
	getSearchs: (query: string) => Promise<SearchCardMovieIntF[]>,
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
			return {
				imdbId: x.externals.imdb,
				poster: x.image.medium,
				title: x.name,
				genres: x.genres,
				runtime: x.runtime,
				officialSite: x.officialSite,
				description: x.summary,
			}
		})

		return movies
	},
}

export { movieRequests }