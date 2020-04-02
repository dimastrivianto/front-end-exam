// rcc
import React, { Component } from 'react'
import axios from 'axios'

export default class DetailProduct extends Component {

    state= {
        product: {}
    }

    componentDidMount() {
        axios.get(`http://localhost:2020/products/${this.props.match.params.idPrdct}`)
        .then((res)=>{
            this.setState({product: res.data})
            // ubah price pak localestring
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="card col-5 mx-auto my-3">
                        <img className="card-img-top" src={this.state.product.src} alt="" />
                        <div className="card-body">
                            {/* agar nama panjang, tetapi isi tetap sejajar */}
                            <div style={{height:50}}>
                                <h5 className="card-title">{this.state.product.name}</h5>
                            </div>
                            <p className="card-text">{this.state.product.desc}</p>
                            <p className="card-text">Rp. {this.state.product.price}</p>
                            <input className="form-control" type="text" placeholder="jumlah qty"/>
                            <button className="btn btn-primary btn-block">Add to Cart</button>
                    </div>
                </div>
                </div>

            </div>
        )
    }
}
