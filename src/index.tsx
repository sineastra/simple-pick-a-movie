import React from 'react'
import ReactDOM from 'react-dom'
import "./normalize.css"
import './index.css'
import App from './Components/App'
import { BrowserRouter } from "react-router-dom"


ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root'),
)
