import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ratingIntF, userData } from "../../_interfaces/state"


const findExistingIndex = (ratings: ratingIntF[], newRating: ratingIntF) =>
	ratings.findIndex(x => x._id === newRating._id)

const initialState: userData = {
	favourites: [],
	ratings: [],
}
const userSlice = createSlice({
	name: 'userData',
	initialState,
	reducers: {
		addFavourite: (state: userData, action: PayloadAction<string>) => {
			if (!state.favourites.includes(action.payload)) {
				state.favourites.push(action.payload)
			}
		},
		removeFavourite: (state: userData, action: PayloadAction<string>) => {
			const index = state.favourites.find(x => x === action.payload)

			if (index) {
				state.favourites.splice(Number(index), 1)
			}
		},
		addRating: (state: userData, action: PayloadAction<ratingIntF>) => {
			const index = findExistingIndex(state.ratings, action.payload)

			if (index === -1) {
				state.ratings.push(action.payload)
			} else {
				state.ratings[index].rating = action.payload.rating
			}
		},
		addComment: (state: userData, action: PayloadAction<ratingIntF>) => {
			const index = findExistingIndex(state.ratings, action.payload)

			if (index === -1) {
				state.ratings.push(action.payload)
			} else {
				state.ratings[index].privateComment = action.payload.privateComment
			}
		},
	},
})

export const { addFavourite, addRating, addComment, removeFavourite } = userSlice.actions
export default userSlice.reducer