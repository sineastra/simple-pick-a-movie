import { Request } from "express"
import jwt from "jsonwebtoken"


export type noteType = { movieId: string, note: string }
export type ratingType = { movieId: string, rating: string }

export interface userInterface {
	_id?: string,
	name: String,
	password: String,
	favourites: string[],
	notes: noteType[],
	ratings: ratingType[],
}

export interface extendedRequestIntF extends Request {
	user: any
}