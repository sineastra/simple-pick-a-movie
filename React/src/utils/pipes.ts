import defaultMovie from "../assets/default-movie.png"


const imagePipe = (image: string) =>
	image !== '' ? image : defaultMovie

const descriptionPipe = (description: string) =>
	description.replace(/(<([^>]+)>)/gi, "")

const genresPipe = (genres: string[]) =>
	genres.length === 0 ? 'No Genres' : genres.join(", ")

export { imagePipe, descriptionPipe, genresPipe }