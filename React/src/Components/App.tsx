import React, { useEffect, useState } from 'react'
import AppRouter from "./AppRouter"
import store, { RootState } from "../_state/app/store"
import { changeUser } from "../_state/features/userSlice"
import jwt_decode from "jwt-decode"
import { userData } from "../_interfaces/state"
import { useSelector } from "react-redux"
import Notif from "./Notif/Notif"


function App () {
	const [isLoading, setIsLoading] = useState(true)
	const notif = useSelector((state: RootState) => state.notifData.notif)

	// loading of the user from cookie on reloads.
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
			: <>
				{ notif && <Notif msg={ notif }/> }
				<AppRouter/>
			</>
	)
}

export default App
