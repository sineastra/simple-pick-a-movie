const baseUrl = `${ process.env["REACT_APP_REST_API_ADDRESS"] }/api`

interface abstractReqIntF {
	uri: string,
	body?: any,
	method?: string,
}
interface abstractJSONRequestIntF {
	uri: string,
	body: any,
	method?: string,
}
interface resIntF {
	status: string,
	statusCode: number,
	data: any
}
interface predefinedBodyIntF {
	method: string,
	headers: { "Access-Control-Allow-Origin": string },
	credentials: string,
}

const abstractRequest = async ({ uri, body = {}, method }: abstractReqIntF): Promise<any> => {
	let predefinedBody: predefinedBodyIntF = {
		// @ts-ignore
		method,
		// @ts-ignore
		headers: {
			// @ts-ignore
			'Access-Control-Allow-Origin': process.env.REACT_APP_ORIGIN,
		},
		credentials: 'include',
	}
	predefinedBody = Object.assign(predefinedBody, body || {})

	return new Promise((resolve, reject) => {
		// @ts-ignore
		fetch(`${ baseUrl }${ uri }`, predefinedBody)
			.then(res => res.json())
			.then((resData: resIntF) => {
				resolve(resData.data)
			})
			.catch(e => {
				reject(e)
			})

	})
}

const abstractJSONRequest = ({ uri, body, method = 'POST' }: abstractJSONRequestIntF) => {
	console.log(body)
	const modifBody = {
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	}

	return abstractRequest({ uri, body: modifBody, method })
}

export { abstractJSONRequest, abstractRequest }