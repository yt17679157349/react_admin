import { Switch, Route } from "react-router-dom"
import Login from "./pages/login/Login"
import Home from "./pages/home/Home"


function App() {

	return (
		<Switch>
			<Route path='/login' component={Login}></Route>
			<Route path='/' component={Home}></Route>
		</Switch>
	)
}

export default App
