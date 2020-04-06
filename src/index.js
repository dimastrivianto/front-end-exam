import React from 'react'
import ReactDOM from 'react-dom'
// provider akan menghubungkan React App dengan Redux
// untuk mengaktifkan react-redux 
// The <Provider /> makes the Redux store available to any nested components that have been wrapped in the connect() function.
import {Provider} from 'react-redux'
// untuk bisa jadi statenya
// akan mengolah hasil dari combineReducers
import {createStore} from 'redux'
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App'
// import hasil combineReducer bukan combnineReducer-nya
import reducers from './reducers/index'

// windows.... dari github devtools
// window._..... tidak wajib, optional untuk melihat isi state
let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>, 
    document.getElementById('root')
)

// nama file index yang ini jangan diganti, yang lain secara teori boleh diganti