import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import "./helper/i18n.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<React.Suspense fallback="Loading...">
					<App />
				</React.Suspense>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
)
