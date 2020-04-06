import React, { Component } from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'


class Cart extends Component {

    state = {
        // totalPrice : "",
        modal : false,
        editCart: {},
        cartUser : []
    }

    // render data
    componentDidMount(){
        this.getCart()
    }

    getCart= () =>{
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
            this.setState({cartUser: hasil, modal : false})
            // console.log(hasil)
        })
    }


    onEditToggle = (id) => {
        // res.data = {id, name, price, desc, src}
        axios.get(`/carts/${id}`)
        .then((res) => { 
            this.setState({ modal : true, editCart : res.data })
        })
    }

    onDeleteProduct = (id) => {
        // axios.delete(`http://localhost:2020/products/${id}`)
        // .then((res) => { this.getData() })

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            // res.value bernilai true jika kita memilih 'ya, sebaliknya
            if (result.value) {

                axios.delete(`/carts/${id}`)
                .then((res) => {

                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                this.getCart()
                })
            }
        })
    }

    onCancelToggle = () => {
        this.setState({ modal : false })
    }

    onSaveProduct = (editObj) => {
        // Ambil data
        let qty = parseInt(editObj.editQty ? editObj.editQty : this.state.editCart.qty)

        // Edit data
        axios.patch(
            `/carts/${this.state.editCart.id}`,
            {
                qty
            }
        ).then((res) => {
            this.getCart()
        })
        
    }

    

    renderCart= () =>{
        
        return this.state.cartUser.map((product)=>{
            // console.log(product)
            // cart.price = cart.price.toLocaleString('in')

            return(
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.desc}</td>
                    <td>Rp. {product.price.toLocaleString('in')}</td>
                    <td>{product.qty}</td>
                    {/* <td><img width="50" src={product.src} alt=""/></td> */}
                    <td><img className="list" src={product.src} /></td>
                    <td>
                        <button onClick={ () => { this.onDeleteProduct(product.id) } } className="btn btn-danger btn-block btn-lg mt-3" >Delete</button>
                    </td>
                </tr>
            )
        })
    }

    renderCheckout = () => {
        
        let totalPrice = 0;
        let renderPrice = this.state.cartUser.map((product)=>{
            let total = product.price * product.qty
            totalPrice+= total
            // this.setState({totalPrice:totalPrice})
            return(
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.qty}</td>
                        <td>Rp. {product.price.toLocaleString('in')}</td>
                        <td>Rp. {total.toLocaleString('in')}</td>
                    </tr>
            )
            // console.log(cart.price)
            // console.log(cart.qty)
            // console.log(total)
            // console.log(totalPrice)
        })
        console.log(renderPrice)
        
        return(
            <div className="container" id="collapseData">
                <h1 className="display-4">TOTAL</h1>
                <table className="table text-center table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col" className="col-2">ID</th>
                            <th scope="col" className="col-3">NAME</th>
                            <th scope="col" className="col-3">QTY</th>
                            <th scope="col" className="col-2">PRICE</th>
                            <th scope="col" className="col-2">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderPrice}
                        <tr>
                            <td colSpan="4">Total</td>
                            <td colSpan="1">Rp. {totalPrice.toLocaleString('in')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        if(this.props.username) {
            return (
                <div className="container">
                    {/* List Cart */}
                    <h1 className="display-4">Cart</h1>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col" className="col-1">ID</th>
                                <th scope="col" className="col-2">NAME</th>
                                <th scope="col" className="col-4">DESC</th>
                                <th scope="col" className="col-2">PRICE</th>
                                <th scope="col" className="col-1">QTY</th>
                                <th scope="col" className="col-2">PICTURE</th>
                                <th scope="col" className="col-2">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCart()}
                        </tbody>
                    </table>
    
                    {/* CHeckout */}
                    <button onClick={ this.renderCheckout } type="button" data-toggle="collapse" data-target="#collapseData" aria-expanded="false" aria-controls="collapseData" className="btn btn-outline-primary btn-block mx-auto btn-lg checkout" >Checkout</button>
                        {this.renderCheckout()}
                </div>
            )
        }else {
            return <Redirect to="/"/>    
        }
    }
}

let mapStateToProps = (state) => {
    return {
        username : state.auth.username
    }
}

export default connect(mapStateToProps)(Cart)
