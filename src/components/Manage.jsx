import React, { Component } from 'react'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ManageProduct extends Component {
    state = {
        products : [],
        editProduct : {},
        modal : false
    }

    // 2
    // hanya di running satu kali, untuk mengambil data pada saat komponen dirunning
    // dipakai karena kita ingin mengambil data tanpa harus melakukan sesuatu , seperti click atau enter
    // waktu di image search tidak pakai karena kita mau mengambil data setelah melakukan submit dan enter
    // function yang running urutan kedua, bisa dipakai untuk apa saja, khususnya memang untuk mengambil data
    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(
            'http://localhost:2020/products'
        ).then((res) => {
            this.setState({products: res.data, modal : false})
            
        })
    }

    fnDelete= (id) => {
        axios.delete(`http://localhost:2020/products/${id}`).then((res)=> {
            this.getData()
            // bisa .then(this.getData())
            // karena kita tidak butuh 'res'
        })
    }

    fnEdit= (id) => {
        axios.get(`http://localhost:2020/products/${id}`)
        .then((res)=> {
            this.setState({modal : true, editProduct : res.data})
        })
    }

    fnCancel=()=>{
        this.setState({modal : false})
    }

    fnSave= ()=> {
        let name = this.editName.value ? this.editName.value : this.state.editProduct.name
        let price = this.editPrice.value ? this.editPrice.value : this.state.editProduct.price
        let desc = this.editDesc.value ? this.editDesc.value : this.state.editProduct.desc
        let src = this.editSrc.value ? this.editSrc.value : this.state.editProduct.src
        // tidak usah destructuring, dikarenakan kita hanya mengirim data saja, nanti api yang melakukan destructuring
        // Edit Data
        axios.patch(`http://localhost:2020/products/${this.state.editProduct.id}`,
        {
            name, price, desc, src
        })
        .then((res)=>{
            this.getData()
        })

    }

    fnAdd=() => {
        // Ambil data dari "input product"
        let name_source= this.name.value
        let desc_source= this.desc.value
        // kalau ingin di rubah menjadi interger lakukan disini
        let price_source= this.price.value
        let src_source= this.src.value

        // axios adalah async
        // kalau get diluar post maka saat kita nge post data dan membutuhkan waktu beberapa detik, sebelum proses tersebut selesai sudah menjalankan get. sedangkan jika get ada didalam post maka akan menunggu post selesai dahulu baru get dijalankan sehingga tidak perlu di refresh
        // yang ada .then adalah async
        // taruh data ke database "db.json"
        axios.post(
            'http://localhost:2020/products',
            {
                name: name_source, 
                desc: desc_source, 
                price: price_source, 
                src: src_source
            }
        ).then((res)=>{
            this.getData()
        })
    }

    fnFilter = () => {
        
        axios.get(
            'http://localhost:2020/products'
        ).then((res)=>{
            this.setState({products: res.data, modal : false})
            this.filter()
        })
    }

    filter = ()=>{
        let name_filter= this.name_filter.value;
        let price_filter= this.price_filter.value;
        let desc_filter = this.desc_filter.value;
        let src_filter = this.src_filter.value
        console.log(this.state.products)

    }

    // tugas hari sabtu
    renderList = () => {
        // harus di return 2 kali ??????
        return this.state.products.map((product) => {
            //product.price=product.price.toLocaleString('in') 
            return(
                    <tr>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.desc}</td>
                        <td>{product.price}</td>
                        <td><img className = "img-fluid"  src= {product.src}/></td>
                        <td>
                            {/* ketika kita ingin memanggil sebuah function yang mengirim argument maka bungkus function tersebut dengan anonymous function */}
                            <div className="container"><button type="button" className="btn btn-outline-info col-12 my-3" onClick={()=>{this.fnEdit(product.id)}}>EDIT</button >
                            <button type="button" className="btn btn-outline-danger col-12" onClick={()=>{this.fnDelete(product.id)}}>DELETE</button></div>
                        </td>
                    </tr>
                )
        })
    }
    

    // 1
    render() {
        return(
            <div className="container">
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
                
                <h1 className="text-center display-4 mb-5">Input Product</h1>
                <table className="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                            <td scope="col"> <input ref={(input)=> {this.name=input}} className="form-control" type="text" placeholder="name"/></td>
                            <td scope="col"> <input ref={(input)=> {this.desc=input}} className="form-control" type="text" placeholder="desc"/></td>
                            <td scope="col"> <input ref={(input)=> {this.price=input}} className="form-control" type="text" placeholder="price"/></td>
                            <td scope="col"> <input ref={(input)=> {this.src=input}} className="form-control" type="text" placeholder="picture"/></td>
                            <td scope="col"> <button onClick={this.fnAdd}className="btn btn-outline-warning btn-block btn-sm">Add</button></td>
                        </tr>
                    </thead>
                </table>
                <h1 className="text-center display-4 mb-5">Filtering Product</h1>
                <table className="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                            <td scope="col"> <input ref={(input)=> {this.name_filter=input}} className="form-control" type="text" placeholder="name"/></td>
                            <td scope="col"> <input ref={(input)=> {this.desc_filter=input}} className="form-control" type="text" placeholder="desc"/></td>
                            <td scope="col"> <input ref={(input)=> {this.price_filter=input}} className="form-control" type="text" placeholder="price"/></td>
                            <td scope="col"> <input ref={(input)=> {this.src_filter=input}} className="form-control" type="text" placeholder="picture"/></td>
                            <td scope="col"> <button onClick={this.fnFilter}className="btn btn-outline-warning btn-block btn-sm">Filter</button></td>
                        </tr>
                    </thead>
                </table>
                {/* Modal Edit */}
                {/* aslinya "kalau di ketik sembarang akan hilang", yang bikin hilang adalah toggle di dalam tag modal, liat code asli di reactstrap, isis dari function toogle sama dengan fnCancel. */}
                <Modal isOpen={this.state.modal} >
                    <ModalHeader >Edit your product</ModalHeader>
                    <ModalBody>
                        {/* tidak bisa pakai this.name, karena sudah dipakai */}
                        Name : <input className="form-control" type="text" ref= {(input)=>{this.editName=input}} placeholder={this.state.editProduct.name}/>
                        Desc : <input className="form-control" type="text" ref= {(input)=>{this.editDesc=input}} placeholder={this.state.editProduct.desc}/>
                        Price : <input className="form-control" type="text" ref= {(input)=>{this.editPrice=input}} placeholder={this.state.editProduct.price}/>
                        Img : <input className="form-control" type="text" ref= {(input)=>{this.editSrc=input}} placeholder={this.state.editProduct.src}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="warning" onClick={this.fnCancel}>Cancel</Button>
                        <Button outline color="success" onClick={this.fnSave}>Save</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default ManageProduct

// db.json d refresh json-server -p 2020 src/api/db.json

// klo mau login bisa d enter pakai onsubmit di form 
// kalau mau dua2nya bikin dua2nya