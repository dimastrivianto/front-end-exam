import React, { Component } from 'react'
import axios from '../config/axios'
// digunakan untuk menghubungkan komponen dengan redux
// connect = officer/dispatch satu2nya dari bagan yang tidak di ketik manual (otomatis)
import {connect} from 'react-redux'
// import action creator
// kalau saat di export menggunakan default, maka tidak perlu menggunakan tanda {}, sedangkan ketika saat di-export tidak menggunakan kata default maka saat di import harus menggunakan {}
import {onLoginUser} from '../actions/index'
// akan me re-direct ke alamat tertentu
import {Redirect} from 'react-router-dom'

class Login extends Component {

    onButtonClick = () => {
        let username = this.username.value
        let pswd = this.pswd.value

        // get data with parameters
        let link = '/users'

        // bisa dengan username: usernam dan pswd: pswd, hanya karena sama jadi bisa langsung satu saja
        // saat kasih params nama property yang ada di dalam object harus sama dengan yang ada di file db.json, tidak boleh beda
        let params = {username, pswd}

        // tidak bisa langsung params seperti pada saat pakai post(dan harus menggunakan nama params karena sudah bawaan dari axios), bisa juga dengan {params: data} dengan catatan bikin let data  dulu
        axios.get(link, {params}).then((res)=>{
            if(res.data.length > 0){
                // user ditemukan : simpan info user ke redux
                // props untuk memanggil dari tempat lain
                // res.data[0] = {id : (value), username : (value)}
                // [0] karena hanya ada satu isinya (tidak bisa diduplicate)
                console.log(res.data)
                this.props.onLoginUser(res.data[0])
            }else {
                // user tidak ditemukan : munculkan notif
                alert(`username or password is incorrect`)
            }
        })

    }

    render() {
        if(!this.props.username){ //jika belum login
            return (
                // masukkan background disini, .login
                <div className="container-fluid">
                    <div className="row login">
                    <div className=" col-5 mx-auto my-auto card">
                        <div className="card-body">
                            <div className="border-bottom border-secondary card-title text-center">
                                <h1>LOGIN</h1>
                            </div>
    
                            <form className='form-group'>
                                <div className="card-title ">
                                    <h4>Username</h4>
                                </div>
                                <input ref={(input) => {this.username = input}} type='text' className='form-control' required/>
                                <div className="card-title ">
                                    <h4>Password</h4>
                                </div>
                                <input ref={(input) => {this.pswd = input}} type='password' className='form-control'/>
                            </form>
    
                            <button className="btn btn-success btn-block" onClick={this.onButtonClick}>Login</button>
                            {/* <button className="btn btn-success btn-block" onClick={this.onGetClick}>Get data</button> */}
                        </div>
                    </div>
                    </div>
                </div>
            )
        }else {
            // "/" diganti /manageproduct dan dihalaman manage product juga dikasih if else, agar tidak ditembak url langsung
            return <Redirect to="/"/>
        }
    }
}

let mapStateToProps = (state) => {
    return {
        username: state.auth.username
    }
} 
// sebelah kiri untuk mengambil yang kanan untuk menaruh
// (login) anonymous function
export default connect(mapStateToProps , {onLoginUser})(Login)

// didalam browser yang sama hanya bisa sekali login kalau ada org lain yang ingin login maka harus di logout defaultStatus, seperti facebook
