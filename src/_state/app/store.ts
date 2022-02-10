import { configureStore } from "@reduxjs/toolkit"
import userDataReducer from "../features/userSlice"


const store = configureStore({
	reducer: {
		userData: userDataReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store