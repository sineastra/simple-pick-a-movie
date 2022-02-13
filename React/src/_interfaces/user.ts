import { movieIntF } from "./movies"


export interface user {
	_id: string,
	name: String,
	hashedPassword: String,
	favourites: movieIntF[],
	notes: { movieId: string, note: string }[],
	ratings: { movieId: string, rating: string }[],
}
