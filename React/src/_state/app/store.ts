import { configureStore } from "@reduxjs/toolkit"
import userDataReducer from "../features/userSlice"
import notifDataReducer from "../features/notifSlice"


const store = configureStore({
	reducer: {
		userData: userDataReducer,
		notifData: notifDataReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store