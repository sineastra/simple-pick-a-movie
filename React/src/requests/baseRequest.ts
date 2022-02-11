const baseAPIUrl = 'https://api.tvmaze.com'

const baseAPIRequest = async (uri: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		fetch(`${ baseAPIUrl }${ uri }`)
			.then(res => res.json())
			.then(resData => {
				resolve(resData.data)
			})
			.catch(e => {
				reject(e)
			})

	})
}

export { baseAPIRequest }