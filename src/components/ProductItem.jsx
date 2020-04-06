import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import axios from '../config/axios'
import Swal from 'sweetalert2'
import {Redirect} from 'react-router-dom'



class ProductItem extends Component {

    state = {
        redirect: false
    }
    // bikin if else kalau belum login
    
    addToCart = () => {
        let qty_source = parseInt(this.qty.value)
        let productId_source = this.props.product.id
        let src_source = this.props.product.src
        let price_source = this.props.product.price
        let desc_source = this.props.product.desc
        let username_source = this.props.username
        let name_source = this.props.product.name

        
        if(this.props.username == ""){
            
            this.setState({ redirect : true })

        }else if(!this.qty.value =="") {
            Swal.fire(
                '',`${this.props.product.name}, has been successfully added to the cart : `,
            )
            
        let checkBool = []
        this.props.cartUser.forEach((cart)=>{
            // console.log(cart)
            checkBool.push(cart.productId == productId_source)
        })
        // console.log(checkBool)
        var indeks = checkBool.indexOf(true)
        // +1 karena id mulai dari 1
        // cartUser[indeks].id
        // var cek = indeks + 1
        // console.log(cek)
            if(checkBool[indeks]==true){
                this.props.cartUser[indeks].qty+= qty_source
                axios.patch(`/carts/${this.props.cartUser[indeks].id}`,
                {
                    qty : this.props.cartUser[indeks].qty
                }
                ).then((res)=>{
                    this.setState({cartUser : res.data})
                    // console.log(res.data)
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


    render() {
        const {redirect} = this.state
        if(redirect){
            return <Redirect to="/login"/>
        }else{
            return (
                <div key={this.props.product.id} className="card col-lg-5 col-xl-3 mx-auto mx-xl-4 my-3">
                    <div className="card-body">
                        <div style={{height: 250}}>
                            <img style={{height: 240}} className="card-img-top" src={this.props.product.src} />
                        </div>
                        <div  style={{height: 50}}>
                                <h5 className="card-title">{this.props.product.name}</h5>
                        </div>
                        <p className="card-text">{this.props.product.desc}</p>
                        <p className="card-text">Rp. {this.props.product.price.toLocaleString('in')}</p>
                        <input ref={( input ) => { this.qty = input }} className="form-control" type="text" placeholder="Jumlah Qty"/>
                        <Link to={`/detailproduct/${this.props.product.id}`}>
                                <button className="btn btn-secondary btn-block my-2">Detail</button>
                        </Link>
                        <button onClick={this.addToCart} className="btn btn-primary btn-block">Add to Cart</button>
                    </div>
                </div>
            )
        }
    }
}


let mapStateToProps = (state) => {
    return {
        username : state.auth.username
    }
}

export default connect(mapStateToProps)(ProductItem)