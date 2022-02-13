import { useSelector } from "react-redux"
import { RootState } from "../_state/app/store"
import React from "react"
import { Navigate } from "react-router-dom"


interface propsIntF {
	children: JSX.Element | null
}
const AuthGuard = ({ children }: propsIntF) => {
	const user = useSelector((state: RootState) => state.userData.loggedUser)

	return (
		user ? children : <Navigate to="/sign-in"/>
	)
}

export default AuthGuard