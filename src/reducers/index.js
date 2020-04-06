import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'

// diimport dimana? yang diimport partnya
export default combineReducers(
    // yang dibawah adalah global state
    {
        auth : AuthReducer
    }
)

// makai redux untuk melempar data dari satu komponen ke komponen lain
// {
//     cust : costumer,
//     comp : complain,
//     mon : money
// }