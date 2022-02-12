export interface movieInteractionIntF {
	_id: string,
	rating: number,
	privateComment: string,
}
export interface userData {
	_id: string,
	name: string,
	iat?: number,
}
export interface userSliceIntF {
	loggedUser: userData | null
}