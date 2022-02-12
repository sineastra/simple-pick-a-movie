import React, { useEffect, useState } from 'react'
import AppRouter from "./AppRouter"
import { userRequests } from "../requests/user"
import store from "../_state/app/store"
import { initFavourites } from "../_state/features/userSlice"
import { movieIntF } from "../_interfaces/movies"


function App () {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const initialStateAssign = async () => {
			const favs = await userRequests.getFavs()
			const favIds = favs.map(x => x.externalId)

			await store.dispatch(initFavourites(favIds))
			setIsLoading(false)
		}

		initialStateAssign()
	}, [])

	return (
		isLoading
			? null
			: <AppRouter/>
	)
}

export default App
