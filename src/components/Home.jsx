import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Home extends Component {
    state = {
        products : []
        // searchProducts : []
    }

    // kalau function bawaan pakai function biasa bukan arrow function
    componentDidMount() {
        this.getProducts()
    }

    getProducts = () => {
        axios.get('http://localhost:2020/products')
        .then((res)=>{
            // searchProducts/ searchProducts: res.data
            this.setState({products: res.data})
        })
    }

    renderProducts= () => {
        // products.map
        return this.state.products.map((product)=>{
            product.price = product.price.toLocaleString('in')
            return(
                <div key={product.id}className="card col-lg-5 col-xl-3 mx-auto mx-xl-4 my-3">
                    <img className="card-img-top" src={product.src} alt="" />
                    <div className="card-body">
                        {/* agar nama panjang, tetapi isi tetap sejajar */}
                        <div style={{height:50}}>
                            <h5 className="card-title">{product.name}</h5>
                        </div>
                        <p className="card-text">{product.desc}</p>
                        <p className="card-text">Rp. {product.price}</p>
                        <input className="form-control" type="text" placeholder="jumlah qty"/>
                        <Link to={`/detailproduct/${product.id}`}>
                            <button className="btn btn-secondary btn-block my-2">Detail</button>
                        </Link>
                        <button className="btn btn-primary btn-block">Add to Cart</button>
                    </div>
                </div>
            )
        })
    }

    onBtnSearch= () => {
        // isi yang ada dibawah dimasukkan ke dalam searchProducts dihapus, perhatikan source yang dirender dan di filter
        
        axios.get('http://localhost:2020/products')
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
            <div className= "container-fluid">
                <div className= "row">
                    {/* Search box */}
                    <div className=" col-10 col-lg-3 col-xl-2">
                        <div className="mt-3">
                            <div className="card">
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
                                    <button className="btn btn-block btn-outline-danger">Reset</button>
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

export default Home
