import React, { Component } from 'react'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// import modal
import ModalEdit from './ModalEdit'

class ManageProduct extends Component{

    state = {
        products: [],
        editProduct : {},
        modal : false
    }

    // Running hanya sekali, setelah proses render yang pertama
    componentDidMount(){
        this.getData()
    }

    // Render List
    renderList = () => {
        // this.state.products = [ {}, {}, {} ]
        // product = {id, name, desc, price, src}
        return this.state.products.map((product) => {
            return(
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.desc}</td>
                    <td>{product.price}</td>
                    {/* <td><img width="50" src={product.src} alt=""/></td> */}
                    <td><img className="img-fluid" src={product.src} alt=""/></td>
                    <td>
                        <div className="container">
                            <button onClick={ () => { this.onEditToggle(product.id) } } className="btn btn-outline-primary btn-block btn-sm" >Edit</button>
                            <button onClick={ () => { this.onDeleteProduct(product.id) } } className="btn btn-outline-danger btn-block btn-sm" >Delete</button>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    // Ambil data
    getData = () => {
        axios.get(
            'http://localhost:2020/products'
        ).then((res) => {
            this.setState({ products: res.data, modal : false })
        })
    }
    
    // Input Data
    onAddProduct = () => {
        // Ambil data dari "Input Product"
        let name_source = this.name.value
        let desc_source = this.desc.value
        let price_source = parseInt(this.price.value)
        let src_source = this.src.value
        
        // Taruh data ke database "db.json"
        axios.post(
            'http://localhost:2020/products',
            {   
                name: name_source,
                desc: desc_source,
                price: price_source,
                src: src_source
            }

        ).then((res) => {
            this.getData()
        })

    }

    // Delete Data
    // http://localhost:2020/products/5
    onDeleteProduct = (id) => {
        axios.delete(`http://localhost:2020/products/${id}`)
        .then((res) => { this.getData() })
    }

    // Edit
    onEditToggle = (id) => {
        // res.data = {id, name, price, desc, src}
        axios.get(`http://localhost:2020/products/${id}`)
        .then((res) => { 
            this.setState({ modal : true, editProduct : res.data })
        })
    }

    // Save
    onSaveProduct = (editObj) => {
        // Ambil data
        let name = editObj.editName ? editObj.editName : this.state.editProduct.name
        let price = parseInt(editObj.editPrice ? editObj.editPrice : this.state.editProduct.price)
        let desc = editObj.editDesc ? editObj.editDesc : this.state.editProduct.desc
        let src = editObj.editSrc ? editObj.editSrc : this.state.editProduct.src

        // Edit data
        axios.patch(
            `http://localhost:2020/products/${this.state.editProduct.id}`,
            {
                name, price, desc, src
            }
        ).then((res) => {
            this.getData()
        })
        
    }

    // Cancel
    onCancelToggle = () => {
        this.setState({ modal : false })
    }


    // 1
    render(){
        return (
            <div className="container">
                {/* List Product */}
                <h1 className="text-center display-4">Manage Product</h1>
                <table className="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                            <th scope="col" className="col-1">ID</th>
                            <th scope="col" className="col-2">NAME</th>
                            <th scope="col" className="col-3">DESC</th>
                            <th scope="col" className="col-2">PRICE</th>
                            <th scope="col" className="col-2">PICTURE</th>
                            <th scope="col" className="col-2">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>

                {/* Input Procduct */}
                <h1 className="text-center display-4">Input Product</h1>
                <table className="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                            <td scope="col"> <input ref={(input) => {this.name = input}} placeholder="name" className='form-control' type="text" /> </td>
                            <td scope="col"> <input ref={(input) => {this.desc = input}} placeholder="description" className='form-control' type="text" /> </td>
                            <td scope="col"> <input ref={(input) => {this.price = input}} placeholder="price" className='form-control' type="text" /> </td>
                            <td scope="col"> <input ref={(input) => {this.src = input}} placeholder="image" className='form-control' type="text" /> </td>
                            <td scope="col"> <button onClick={this.onAddProduct}  className="btn btn-outline-primary btn-block btn-sm">input</button> </td>
                        </tr>
                    </thead>
                </table>

                {/* Modal Component */}
                <ModalEdit 
                    a={this.state.modal} 
                    b={this.state.editProduct}
                    c={this.onCancelToggle}
                    d={this.onSaveProduct}
                />
            </div>
        )
    }
}

export default ManageProduct