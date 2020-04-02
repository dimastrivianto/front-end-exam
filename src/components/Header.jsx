import React, { Component } from 'react'
// agar tidak nge-refresh pada saat di click, pakai tag={link} dan href diganti dengan to
import {Link} from 'react-router-dom'
import {
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink,
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
        NavbarText
    } from 'reactstrap';
    // menghubungkan component ke redux
    import {connect} from 'react-redux'

    import {onLogoutUser} from '../actions/index'


    // npm install akan meng-install semua module yang ada dalam package.json saat kita cloning sebuah file dari github, agar program bisa berjalan.
    // bisa juga dengan manual dengan melihat dependencies di dalam package.json
    // kalau menginstall npm ke global artinya akan d install ke dlaam laptop bukan ke dalam project kita, sehingga pada saat orang akan clone project tidak tahu npm apa yang harus di install.
    // kalau di install tidak global maka setiap project baru harus di install lagi

class Header extends Component {
    state = {
        isOpen : true
    }
    

    toggle = () => this.setState({isOpen :!this.state.isOpen})

    // hooks
    // const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);

    // CARA PERTAMA
    renderNav = ()=>{
        // jika tidak login
        if(this.props.username == ""){
            return(
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/register">Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/login">Login</NavLink>
                    </NavItem>
                </Nav>   
                        )
        }
        // jika login
            return(
                <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        {/* pakai this.props karena dari luar dimasukkan ke dalam (state diubah menjadi props?) */}
                        Hello, {this.props.username}
                    </DropdownToggle>
                        <DropdownMenu right>
                            <NavLink tag={Link} to="/manageproduct">
                                <DropdownItem>Manage Product</DropdownItem>
                            </NavLink>
                            {/* ganti dengan cart */}
                            <NavLink tag={Link} to="/">
                                <DropdownItem>Option 2</DropdownItem>
                            </NavLink>
                            <DropdownItem divider />
                            {/* this.props.onLogoutUser tidak dikasih () untuk menjalankan function karena saat proses pertama kali komponen dibuat kita tidak mau function ini di running, namun setelah di click baru jalan */}
                            {/* 
                            ketika state pada redux berubah, maka akan men-trigger function render untuk running ulang (re-render) 
                            render siapa? render komponen
                            */}
                            {/* untuk bikin logout balik ke home, coba bikin function baru yang kirim function logout user, di dalam function tersebut masukkan ke */}
                            {/* bisa tidak direct ke home?? */}
                            <NavLink tag={Link} to="/">
                                <DropdownItem onClick={this.props.onLogoutUser}>logout</DropdownItem>
                            </NavLink>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            )
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand tag={Link} to="/">reactstrap</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {/* memakai tanda () karena saat komponen ini dibuat kita mau function langsung di running  */}
                        {this.renderNav()}

                    </Collapse>
                </Navbar>
            </div>
        )
        
// CARA KEDUA
        // if(this.props.username == ""){
        //     return (
        //         <div>
        //             <Navbar color="light" light expand="md">
        //                 <NavbarBrand tag={Link} to="/">reactstrap</NavbarBrand>
        //                 <NavbarToggler onClick={this.toggle} />
        //                 <Collapse isOpen={this.state.isOpen} navbar>
        //                     <Nav className="ml-auto" navbar>
        //                         <NavItem>
        //                             <NavLink tag={Link} to="/register">Register</NavLink>
        //                         </NavItem>
        //                         <NavItem>
        //                             <NavLink tag={Link} to="/login">Login</NavLink>
        //                         </NavItem>
        //                     </Nav>
        //                 </Collapse>
        //             </Navbar>
        //         </div>
        //     )
        // }
        // return (
        //     <div>
        //         <Navbar color="light" light expand="md">
        //             <NavbarBrand tag={Link} to="/">reactstrap</NavbarBrand>
        //             <NavbarToggler onClick={this.toggle} />
        //             <Collapse isOpen={this.state.isOpen} navbar>
        //                 <Nav className="ml-auto" navbar>
        //                     <UncontrolledDropdown nav inNavbar>
        //                     <DropdownToggle nav caret>
        //                         {/* pakai this.props karena dari luar dimasukkan ke dalam (state diubah menjadi props?) */}
        //                         Hello, {this.props.username}
        //                     </DropdownToggle>
        //                         <DropdownMenu right>
        //                             <DropdownItem>
        //                             Option 1
        //                             </DropdownItem>
        //                             <DropdownItem>
        //                             Option 2
        //                             </DropdownItem>
        //                             <DropdownItem divider />
        //                             <DropdownItem>
        //                             Reset
        //                             </DropdownItem>
        //                         </DropdownMenu>
        //                     </UncontrolledDropdown>
        //                 </Nav>
        //             </Collapse>
        //         </Navbar>
        //     </div>
        // )
    
    }
        
}

// nama bebas
let mapStateToProps = (state) => {
    // bisa liat di redux devtools
    return {
        username : state.auth.username
    }
}
// mapStateToProps dan onLoginUser bisa diganti, khusus untuk mapStateToProps biasanya ini yang dipakai
export default connect(mapStateToProps, {onLogoutUser})(Header)
