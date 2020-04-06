import React, { Component } from 'react'
import axios from '../config/axios'
import ProductItem from './ProductItem'
import {connect} from 'react-redux'

class Home extends Component {
    state = {
        products : [],
        cartUser : []
    }

    // kalau function bawaan pakai function biasa bukan arrow function
    componentDidMount() {
        this.getProducts()
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
    }

    getProducts = () => {
        axios.get('/products')
        .then((res)=>{
            this.name.value=""
            this.min.value=""
            this.max.value=""
            
            // searchProducts/ searchProducts: res.data
            this.setState({products: res.data})
        })
    }

    renderProducts= () => {
        // products.map
        return this.state.products.map((product) => {

            // Untuk memisahkan setiap 3 digit angka dengan karakter titik.
            // product.price = product.price.toLocaleString('in')

            return (
                <ProductItem product={product} 
                cartUser={this.state.cartUser} 
                />
            )
        })
    }

    onBtnSearch= () => {
        // isi yang ada dibawah dimasukkan ke dalam searchProducts dihapus, perhatikan source yang dirender dan di filter
        
        axios.get('/products')
        .then((res)=>{

        let keyword = this.name.value
    
        // by name
        // res.data
            // let filterResult = res.data.filter((product)=> {
            //     return (
            //         product.name.toLowerCase().includes(keyword.toLowerCase())
            //     ) 
            // })

        // Price
        let minPrice = parseInt(this.min.value)
        let maxPrice = parseInt(this.max.value)
        // filter mengembalikan array, itu kenapa array kosong
        let filterResult = []
        
        if (isNaN(maxPrice) && isNaN(minPrice)) {
            filterResult = res.data.filter((product)=>{
                return (
                    product.name.toLowerCase().includes(keyword.toLowerCase())
                )
            })
        }else if(isNaN(maxPrice)){// min, filter by name juga dimasukkan, karena pada dasarnya saat isi dari nama adalah string kosong semua produk akan muncul. sehingga filtering akan dilakukan berdasarkan harga saja, dan pada saat nama ada inputnya maka akan di filter berdasarkan nama dan harga 
            filterResult= res.data.filter((product)=> {
                return (
                    product.price>= minPrice && product.name.toLowerCase().includes(keyword.toLowerCase())
                )
            })
        }else if(isNaN(minPrice)){// max
            filterResult= res.data.filter((product)=>{
                return (
                    product.price<= maxPrice && product.name.toLowerCase().includes(keyword.toLowerCase())
                )
            })
        }else {
            filterResult= res.data.filter((product)=> {
                return (
                    maxPrice>=product.price && product.price>=minPrice && product.name.toLowerCase().includes(keyword.toLowerCase())
                )
            })
        }
        // products: filterResult
            this.setState({ products: filterResult})
        
        })
    }

    render() {
        return (
            <div className= "container-fluid home">
                <div className= "row">
                    {/* Search box */}
                    <div className=" col-10 col-lg-3 col-xl-2">
                        <div className="mt-3">
                            <div className="card cardbg">
                                <div className="border-bottom border-secondary card-title">
                                    <h1 className="text-center">Search</h1>
                                </div>
                                <div className="card-body">
                                    <h4>Name</h4>
                                    <input ref={(input)=>{this.name=input}} className="form-control" type="text"/>
                                    <h4>Price</h4>
                                    <input ref={(input)=>{this.min=input}} placeholder="Minimum" className="form-control mb-2" type="text"/>
                                    <input ref={(input)=>{this.max=input}} placeholder="Maximum" className="form-control" type="text"/>
                                    
                                    <button onClick={this.onBtnSearch} className="btn btn-block btn-outline-primary mt-5 ">Search</button>
                                    <button onClick={this.getProducts} className="btn btn-block btn-outline-danger">Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>      
                    {/* List Product */}
                    <div className="row col-10 col-lg-9">
                        {this.renderProducts()}
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

export default connect(mapStateToProps)(Home)

