import { movieIntF } from "../_interfaces/movies"
import { abstractRequest } from "./abstractRequests"



interface moviesRequestsIntF {
	getDetails: (imdbId: string) => Promise<movieIntF>,
	getSearchs: (q: string) => Promise<movieIntF[]>
}
const movieRequests: moviesRequestsIntF = {
	getSearchs: async (query: string) =>
		await abstractRequest({ uri: `/movies${ query }` }),
	getDetails: async (movieId) =>
		await abstractRequest({ uri: `/movies/${ movieId }` }),

}

export { movieRequests }