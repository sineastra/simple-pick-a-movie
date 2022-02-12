import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { userData, userSliceIntF } from "../../_interfaces/state"


const initialState: userSliceIntF = { loggedUser: null }
const userSlice = createSlice({
	name: 'userData',
	initialState,
	reducers: {
		changeUser: (state, action: PayloadAction<userData | null>) => {
			state.loggedUser = action.payload
		},
	},
})

export const { changeUser } = userSlice.actions
export default userSlice.reducer