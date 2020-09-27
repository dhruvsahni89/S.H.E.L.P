import React, {Component} from 'react';
import './Navbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../../UI/Logo/Logo';
import SideToggler from '../../SideNav/SideToggler/SideToggler';
import AuthServices from '../../../../ApiServices/auth.service';

class Navbar extends Component {
    
    state = {
        isLoggedIn:false,
    }

    componentDidMount(){
         let userToken = AuthServices.getCurrentUser();
         if(userToken!==null){
             this.setState({isLoggedIn:true});
         }
     }


    render(){
    return(<header className="Navbar">
    <SideToggler clicked= {this.props.drawerTogglerClicked} />
    
    <div className="Logo-specs">
       <Logo/>
     
    </div>
    
    <nav className="DesktopOnly">
            <NavigationItems login = {this.state.isLoggedIn} />
    </nav>


</header>)}
};

export default Navbar;