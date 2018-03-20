import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {black} from 'material-ui/styles/colors'
import Wrapper from './containers'
import {BrowserRouter} from 'react-router-dom'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducers from './redux/reducers'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './redux/sagas'
// import injectTapEventPlugin from 'react-tap-event-plugin'
// injectTapEventPlugin()

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)
getMuiTheme({
  palette: {
    textColor: black
  },
  appBar: {
    height: 50
  }
})

class App extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <Provider store={store} >
            <Wrapper />
          </Provider>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}
export default App
// export default (props) => {
//   console.log('PROPS PROPS: ', props)
//   return (
//     <MuiThemeProvider>
//       <BrowserRouter>
//         <Provider store={store} >
//           <div>
//             <Wrapper location={props.location} />
//             <Toast />
//           </div>
//         </Provider>
//       </BrowserRouter>
//     </MuiThemeProvider>
//   )
// }
