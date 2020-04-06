// rcc
import React, { Component } from 'react'
import axios from '../config/axios'

import {connect} from 'react-redux'
import Swal from 'sweetalert2'



class DetailProduct extends Component {

    state= {
        product: {},
        cartUser : []
    }
    
    componentDidMount() {
        axios.get(`/products/${this.props.match.params.idPrdct}`)
        .then((res)=>{
            this.setState({product: res.data})
            // ubah price pak localestring
        })
        axios.get('/carts')
        .then((res)=>{
            let hasil = []
            hasil = res.data.filter((data)=>{
                // console.log(data)
                // console.log(data.username)
                // console.log(this.props.username)
                return(
                    data.username == this.props.username    
                )
            })
            this.setState({cartUser: hasil})
            // console.log(hasil)
            // console.log(hasil)
            // console.log(this.state.cartUser[1])
            
        })
        // this.state.product.price = this.state.product.pricetoLocaleString('in')
    }

    addToCart = () => {
        let qty_source = parseInt(this.qty.value)
        let productId_source = this.state.product.id
        let src_source = this.state.product.src
        let price_source = this.state.product.price
        let desc_source = this.state.product.desc
        let username_source = this.props.username
        let name_source = this.state.product.name

        if(this.props.username == ""){
            Swal.fire({
                title: 'Anda harus login terlebih dahulu',
                showClass: {
                popup: 'animated fadeInDown faster'
                },
                hideClass: {
                popup: 'animated fadeOutUp faster'
                }
            })
        }else if(!this.qty.value =="") {
            Swal.fire(
                '',`${this.state.product.name}, has been successfully added to the cart : `,
            )
        
        let checkBool = []
        this.state.cartUser.forEach((cart)=>{
            checkBool.push(cart.productId == productId_source)
        })
        var indeks = checkBool.indexOf(true)
        // +1 karena id mulai dari 1
        
            if(checkBool[indeks]==true){
                this.state.cartUser[indeks].qty+= qty_source
                axios.patch(`/carts/${this.state.cartUser[indeks].id}`,
                {
                    qty : this.state.cartUser[indeks].qty
                }
                ).then((res)=>{
                    this.setState({cartUser : res.data})
                    console.log(res.data)
                })
            }else{
                axios.post('/carts',
                {
                    username : username_source,
                    name : name_source,
                    productId : productId_source,
                    src : src_source,
                    desc : desc_source,
                    price : price_source,
                    qty : qty_source
                }
                ).then((res)=>{
                    this.setState({cartUser : res.data})
                })
            } 
        }else{
            Swal.fire ('','you haven\'t input any qty','')
        }        
    }

// gak usah pakai kalau login
    render() {            
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-5 mx-auto px-5 my-3">
                        <div className="card cardbg">
                            <div>
                                <img className="card-img-top" style={{height:400}} src={this.state.product.src} />
                            </div>
                            <div className="card-body">
                                {/* agar nama panjang, tetapi isi tetap sejajar */}
                                <div style={{height:50}}>
                                    <h5 className="card-title">{this.state.product.name}</h5>
                                </div>
                                <p className="card-text">{this.state.product.desc}</p>
                                <p className="card-text">Rp. {this.state.product.price}</p>
                                <input ref={( input ) => { this.qty = input }} className="form-control" type="text" placeholder="Jumlah Qty"/>
                                <button className="btn btn-primary btn-block" onClick={this.addToCart}>Add to Cart</button>
                            </div>
                        </div>
                        </div>
                    </div>
    
                </div>
            )
    }
}

let mapStateToProps = (state) => {
    return {
        username : state.auth.username
    }
}

export default connect(mapStateToProps)(DetailProduct)
