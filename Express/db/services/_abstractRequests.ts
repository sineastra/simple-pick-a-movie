const baseAPIUrl = 'https://api.tvmaze.com'
const fetch = require('node-fetch')

const abstractAPIRequest = async (uri: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		fetch(`${ baseAPIUrl }${ uri }`)
			.then((res: any) => res.json())
			.then((resData: any) => resolve(resData))
			.catch((e: any) => reject(e))

	})
}

export { abstractAPIRequest }