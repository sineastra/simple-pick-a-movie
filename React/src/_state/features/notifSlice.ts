import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { notifSliceIntF } from "../../_interfaces/state"


const initialState: notifSliceIntF = { notif: '' }
const notifSlice = createSlice({
	name: 'notifData',
	initialState,
	reducers: {
		displayNotif: (state, action: PayloadAction<string>) => {
			state.notif = action.payload
		}
	},
})

export const { displayNotif } = notifSlice.actions
export default notifSlice.reducer