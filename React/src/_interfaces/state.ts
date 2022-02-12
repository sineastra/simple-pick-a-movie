import { movieIntF } from "./movies"


export interface movieInteractionIntF {
	_id: string,
	rating: number,
	privateComment: string,
}
export interface userData {
	favourites: string[],
}