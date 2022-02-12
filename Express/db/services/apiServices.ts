import { movieIntF } from "../../_interfaces/movieInterfaces"
import { abstractAPIRequest } from "./_abstractRequests"


const getMovieInfo = (movie: any): movieIntF => {
	const image = movie && movie.image && movie.image.medium ? movie.image.medium : ''

	return {
		externalId: movie.id,
		poster: image,
		title: movie.name,
		genres: movie.genres,
		runtime: movie.runtime || 0,
		officialSite: movie.officialSite || '',
		description: movie.summary || 'No description',
	}
}

interface apiServicesIntF {
	getFavs: (ids: string[]) => Promise<movieIntF[]>,
	getSearchs: (query: string) => Promise<movieIntF[]>,
	getDetails: (id: string) => Promise<movieIntF>
}
const apiServices: apiServicesIntF = {
	getFavs: async (ids) => {
		const fetchReq = async (id: string): Promise<movieIntF> => {
			const movieData = await abstractAPIRequest(`/shows/${ id }`)

			return getMovieInfo(movieData)
		}
		const promises = ids.map(fetchReq)
		const movies: movieIntF[] = await Promise.all(promises)

		return movies
	},
	getSearchs: async (query) => {
		const movieData = await abstractAPIRequest(`/search/shows?q=${ query }`)

		const movies: movieIntF[] = movieData.map((x: any) => {
			return getMovieInfo(x.show)
		})

		return movies
	},
	getDetails: async (id) => {
		const movieData = await abstractAPIRequest(`/shows/${ id }`)

		return getMovieInfo(movieData)
	},
}

export { apiServices }