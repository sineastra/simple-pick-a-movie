export interface ratingIntF {
	_id: string,
	rating: number,
	privateComment: string,
}
export interface userData {
	favourites: string[],
	ratings: ratingIntF[]
}