export interface FavCardMovieIntF {
	imdbId: string,
	poster: string,
	title: string,
	genres: string[],
}

export interface SearchCardMovieIntF extends FavCardMovieIntF{
	runtime: number,
	officialSite: string,
	description: string,
}