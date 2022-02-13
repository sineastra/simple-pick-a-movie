import { Request } from "express"


export type noteType = { movieId: string, note: string }
export type ratingType = { movieId: string, rating: string }

export interface baseUserInterface {
	name: String,
	password: String,
	favourites: string[],
	notes: noteType[],
	ratings: ratingType[],
}

export interface userInterface extends baseUserInterface{
	_id: string,
}

export interface extendedRequestIntF extends Request {
	user: requestUserIntF
}

export interface requestUserIntF {
	_id: string,
	name: string,
	iat?: number,
}