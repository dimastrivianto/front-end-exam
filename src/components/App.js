import React, { Component } from 'react'
// yang akan menghandle ketika berpindah dari satu halaman ke halaman lain
import {Route, BrowserRouter} from 'react-router-dom'

// components
import Header from './Header'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import ManageProduct from './ManageProduct'
import DetailProduct from './DetailProduct'

// Keeplogin
import {keepLogin} from '../actions/index'
import { connect } from 'react-redux'

class App extends Component{

    componentDidMount(){
        // bisa juga begini
        // let user = JSON.parse(localStorage.getItem('userData'))
        let userData = localStorage.getItem('userData')
        let user = JSON.parse(userData)

        if(user) {
            this.props.keepLogin(user)
        }
    }

    render(){
        return(
            <BrowserRouter>
                <div>
                    <Header/>
                    {/* karena dia akan mengecek memakai "link.includes(path)"
                    saat di cek mis: /register, maka saat di looping ketemu "/" yang nge-link ke home (maka page home akan muncul), maka pada saat ketemu /register dia
                    akan return path "/" dan "/register" (yang akan mereturn page home dan page register), sehingga harus memakai "exact", sehingga dicarinya menggunakan perbandingan link==path,
                    tidak lagi dengan link.includes(path)
                    berikan exact di tempat yang sedikit, dalam hal ini "/" */}
                    {/* memakai perbandingan link==path */}
                    <Route path="/" exact component={Home} />
                    {/* memakai link.includes(path) */}
                    <Route path="/register" component={Register} />
                    {/* memakai link.includes(path) */}
                    <Route path="/login" component={Login} />
                    <Route path="/manageproduct" component={ManageProduct} />
                    {/* namaidPrdct bisa di ganti */}
                    <Route path="/detailproduct/:idPrdct" component={DetailProduct} />
                </div>
            </BrowserRouter>
        )
    }
}
// kalau lebih dari satu (argument) {keepLogin,argument kedua} bisa hanya dengan menggunakan onLoginUser, tinggal ganti di import dengan onLoginUser dan yang bawah hapus keeplogin
export default connect(null, {keepLogin})(App)