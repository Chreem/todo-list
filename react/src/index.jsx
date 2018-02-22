import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'

import './js/calcRootSize'

if (process.env.NODE_ENV !== 'production') {
    const AppContainer = require('react-hot-loader').AppContainer;
    const render = Component => {
        ReactDOM.render(
            <AppContainer>
                <Component />
            </AppContainer>
            , document.getElementById('root')
        )
    }

    render(App)

    if (module.hot) {
        module.hot.accept('./app.jsx', () => { render(App) })
    }
} else {
    ReactDOM.render(<App></App>, document.getElementById('root'))
}