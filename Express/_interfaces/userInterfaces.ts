
export interface userInterface {
	name: String,
	hashedPassword: String,
	favourites: string[],
	notes: { movieId: string, note: string }[],
	ratings: { movieId: string, rating: string }[],
}