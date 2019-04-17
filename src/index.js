import React from 'react'
import ReactDom from 'react-dom'
import { createStore,applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authrouter/authrouter'
import reducers from './reducer'
import './config'
import './index.css'

function Boss () {
    return <h1>boss页面</h1>
}
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension():f=>f
))
ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
                <AuthRoute></AuthRoute>
                <Route path='/boss' component={Boss}></Route>
				<Route path='/login' component={Login}></Route>
				<Route path='/register' component={Register}></Route>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)