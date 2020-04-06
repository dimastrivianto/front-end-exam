import React, { Component } from 'react'
import axios from '../config/axios'

// $ npx json-server -p 2020 ./src/api/db.json (mengaktifkan json-placeholder dan dijalankan duluan sebelum npm start(react))
// kalau isi manual di dalam db.json maka harus di npx json-server..... lagi, kalau langsung dari halaman web tidak perlu
// ctrl+c sebelum merefresh json

class Register extends Component {

    onButtonClick= () => {
        // ambil value
        let username = this.username.value
        let email = this.email.value
        let pswd = this.password.value

        // simpan di json
        // GET, POST, PUT, PATCH
        // link bisa jadi satu karena sama
        let linkPost ='/users'
        let linkGet ='/users'
        let data = {username, email, pswd}

        // get data
        axios.get(linkGet).then((res)=>{
            // check duplicate data
            // res.data = [{}, {}, {}]
            // user = {username, email, pswd}
            let takenUser= res.data.filter ((user)=>{
                return user.username== username
            })
            // pakai return jadi cukup menampilkan salah satu saja tidak usah keduanya. karena code setelah return tidak akakn dijalankan, atau pakai else yang didalamnya diberikan if yang email
            if(takenUser.length > 0){
                return alert(`Username ${username} sudah terpakai`)
            }

            let takenEmail= res.data.filter ((user)=>{
                return user.email== email
            })
            // hasil filter adalah array
            if(takenEmail.length > 0){
                return alert(`Email ${email} sudah terpakai`)
            }
            // untuk post butuh link dan data
            // karena pakai return axios.post tidak akan jalan jika ada yang sama, atau bisa juga pakai if else, yang didalam else ada axios.post
            axios.post(linkPost, data).then((res) => {alert('register berhasil')})
        })

    }
    // onGetClick= () => {
    //     let link = "http://localhost:2020/users"
    //     // [{...}]
    //     axios.get(link).then((res)=>{console.log(res.data)})
    // }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                <div className=" col-5 mx-auto mt-5 card">
                    <div className="card-body">
                        <div className="border-bottom border-secondary card-title text-center">
                            <h1>Register</h1>
                        </div>

                        <form className='form-group'>
                            <div className="card-title ">
                                <h4>Username</h4>
                            </div>
                            <input ref={(input) => {this.username = input}} type='text' className='form-control' required/>

                            <div className="card-title ">
                                <h4>Email</h4>
                            </div>
                            <input ref={(input) => {this.email = input}} type='email' className='form-control'/>

                            <div className="card-title ">
                                <h4>Password</h4>
                            </div>
                            <input ref={(input) => {this.password = input}} type='password' className='form-control'/>
                        </form>

                        <button className="btn btn-success btn-block" onClick={this.onButtonClick}>Register</button>
                        {/* <button className="btn btn-success btn-block" onClick={this.onGetClick}>Get data</button> */}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Register
