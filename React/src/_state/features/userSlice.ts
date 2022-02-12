import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { movieInteractionIntF, userData } from "../../_interfaces/state"
import { movieIntF } from "../../_interfaces/movies"


const initialState = {
	favourites: [],
}
const userSlice = createSlice({
	name: 'userData',
	initialState,
	reducers: {
		addFavourite: (state: userData, action: PayloadAction<string>) => {
			if (!state.favourites.some(x => x === action.payload)) {
				state.favourites = [...state.favourites, action.payload]
			}
		},
		removeFavourite: (state: userData, action: PayloadAction<string | undefined>) => {
			const index = state.favourites.findIndex(x => x === action.payload)

			if (action.payload === undefined) {
				state.favourites = []
			} else if (index !== -1) {
				state.favourites.splice(Number(index), 1)
			}
		},
		initFavourites: (state: userData, action: PayloadAction<string[]>) => {
			state.favourites = action.payload
		},
	},
})

export const {
	addFavourite,
	removeFavourite,
	initFavourites,
} = userSlice.actions
export default userSlice.reducer