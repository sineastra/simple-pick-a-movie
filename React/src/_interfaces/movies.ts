export interface movieIntF {
	_id?: string,
	externalId: string,
	poster: string,
	title: string,
	genres: string[],
	runtime: number,
	officialSite: string,
	description: string,
}

export interface movieDetailsForUserIntF {
	rating: number
	notes: string
}