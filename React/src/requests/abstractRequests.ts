import store from "../_state/app/store"
import { displayNotif } from "../_state/features/notifSlice"


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
interface responseIntF {
	status: string,
	statusCode: number,
	data?: any
	errors?: { msg: string }[],
	softError?: boolean,
}
interface predefinedBodyIntF extends RequestInit {
	method: string,
	headers: { "Access-Control-Allow-Origin": string },
	credentials: RequestCredentials,
}

const abstractRequest = async ({ uri, body = {}, method = "GET" }: abstractReqIntF): Promise<any> => {
	let predefinedBody: predefinedBodyIntF = {
		method,
		headers: {
			'Access-Control-Allow-Origin': process.env.REACT_APP_ORIGIN || 'http://localhost:3030',
		},
		credentials: 'include',
	}
	predefinedBody = Object.assign(predefinedBody, body || {})

	return new Promise((resolve, reject) => {
		fetch(`${ baseUrl }${ uri }`, predefinedBody)
			.then(res => res.json())
			.then((resData: responseIntF) => {
				if (resData.data !== undefined) {
					resolve(resData.data)
				} else if (resData.softError && resData.errors) {
					const errors = resData.errors.map(x => x.msg).join('\n')

					store.dispatch(displayNotif(errors))
					setTimeout(() => {
						store.dispatch(displayNotif(''))
					}, 5000)
				} else {
					reject(resData)
				}
			})
			.catch(e => {
				reject(e)
			})

	})
}

const abstractJSONRequest = ({ uri, body, method = 'POST' }: abstractJSONRequestIntF) => {
	const jsonBody = {
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	}

	return abstractRequest({ uri, body: jsonBody, method })
}

export { abstractJSONRequest, abstractRequest }