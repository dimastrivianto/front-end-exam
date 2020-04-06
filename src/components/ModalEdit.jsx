import React, { Component } from 'react'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ModalEdit extends Component {

    state = {
        editName: "",
        editDesc: "",
        editPrice: "",
        editStock: "",
        editSrc: ""
    }

    render() {
        return (
            <div>
                {/* <Modal isOpen={this.state.modal} toggle = {this.onCancelToggle} > jika ingin klik sembarang menutup modal*/}
                <Modal isOpen={this.props.modal} >
                    <ModalHeader >Edit your product</ModalHeader>
                    <ModalBody>
                        {/* e akan langsung terbuat saat eventnya d trigger (onClick,onChange,onSubmit,dll) */}
                        Name : <input className="form-control" type="text" onChange ={(e)=>{this.setState({editName: e.target.value})}} placeholder={this.props.editProduct.name}/>
                        Desc : <input className="form-control" type="text" onChange ={(e)=>{this.setState({editDesc: e.target.value})}} placeholder={this.props.editProduct.desc}/>
                        Price : <input className="form-control" type="text" onChange ={(e)=>{this.setState({editPrice: e.target.value})}}placeholder={this.props.editProduct.price}/>
                        Stock : <input className="form-control" type="text" onChange ={(e)=>{this.setState({editStock: e.target.value})}}placeholder={this.props.editProduct.stock}/>
                        Img : <input className="form-control" type="text" onChange ={(e)=>{this.setState({editSrc: e.target.value})}}placeholder={this.props.editProduct.src}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="warning" onClick={this.props.cancel} >Cancel</Button>
                        {/* this.state akan masuk ke editObj pada function fnSave di manageproduct */}
                        <Button outline color="success" onClick={()=>{this.props.save(this.state)}} >Save</Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}