import React from 'react'
import ReactDOM from 'react-dom'
import "./normalize.css"
import './index.css'
import App from './Components/App'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./_state/app/store"


ReactDOM.render(
	<React.StrictMode>
		<Provider store={ store }>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
)
