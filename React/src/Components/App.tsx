import React, { useEffect, useState } from 'react'
import AppRouter from "./AppRouter"
import store from "../_state/app/store"
import { changeUser } from "../_state/features/userSlice"
import jwt_decode from "jwt-decode"
import { userData } from "../_interfaces/state"


function App () {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const b = document.cookie.match("(^|;)\\s*" + process.env.REACT_APP_COOKIE_NAME + "\\s*=\\s*([^;]+)")
		const jwtCookie = b ? b.pop() : ""

		if (jwtCookie) {
			const user = jwt_decode(jwtCookie)
			store.dispatch(changeUser(user as userData))
		}

		setIsLoading(false)
	}, [])

	return (
		isLoading
			? null
			: <AppRouter/>
	)
}

export default App
