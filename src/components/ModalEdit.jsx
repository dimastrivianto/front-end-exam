import React, { Component } from 'react'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ModalEdit extends Component {

    state = {
        editName: "",
        editDesc: "",
        editPrice: "",
        editSrc: ""
    }

    render() {
        return (
            <div>
                {/* <Modal isOpen={this.state.modal} toggle = {this.onCancelToggle} > jika ingin klik sembarang menutup modal*/}
                <Modal isOpen={this.props.a} >
                    <ModalHeader >Edit your product</ModalHeader>
                    <ModalBody>
                        {/* e akan langsung terbuat saat eventnya d trigger (onClick,onChange,onSubmit,dll) */}
                        Name : <input className="form-control" type="text" onChange ={(e)=>{this.setState({editName: e.target.value})}} placeholder={this.props.b.name}/>
                        Desc : <input className="form-control" type="text" onChange ={(e)=>{this.setState({editDesc: e.target.value})}} placeholder={this.props.b.desc}/>
                        Price : <input className="form-control" type="text" onChange ={(e)=>{this.setState({editPrice: e.target.value})}}placeholder={this.props.b.price}/>
                        Img : <input className="form-control" type="text" onChange ={(e)=>{this.setState({editSrc: e.target.value})}}placeholder={this.props.b.src}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="warning" onClick={this.props.c} >Cancel</Button>
                        {/* this.state akan masuk ke editObj pada function fnSave di manageproduct */}
                        <Button outline color="success" onClick={()=>{this.props.d(this.state)}} >Save</Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}