import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import App from "./App"

import {getStore} from './utils/userSaveStorage';
import user from './utils/userSaveMemory';
const value = getStore()
user.userInfo = value
ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
)
