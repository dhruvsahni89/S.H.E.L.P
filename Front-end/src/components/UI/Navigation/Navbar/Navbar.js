import React, {Component} from 'react';
import './Navbar.css';
import {NavLink} from 'react-router-dom';

import Logo from '../../../UI/Logo/Logo';
//import ProfileLogo from '../../../UI/Logo/profileLogo';
//import SideToggler from '../../SideNav/SideToggler/SideToggler';
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

        let LoginLinks = ( <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          
          <NavLink to="/signup" className="nav-link">Teach on Shelp</NavLink>
        </li>
        <li className="nav-item">
          
          <NavLink to="/" className="nav-link">Profile</NavLink>
          
        </li>
       
        <li className="nav-item">
          <NavLink to="/" className="nav-link">WhishList</NavLink>
         
        </li>

         
        <li className="nav-item">
          <NavLink to="/" className="nav-link">Logout</NavLink>
         
        </li>
      </ul>
      );

      if(!this.state.isLoggedIn){
        LoginLinks =( <ul className="navbar-nav ml-auto">

                <li className="nav-item active">
                <NavLink to="/" className="nav-link">Teach on Shelp</NavLink>
                </li>

                <li className="nav-item">
                
                <NavLink to="/" className="nav-link">Signup</NavLink>
                
                </li>
            
                <li className="nav-item">
                <NavLink to="/" className="nav-link">Login</NavLink>
                
                </li>

                
               
      </ul>
        )}

       
    return(
  

<nav className="navbar navbar-expand-lg navbar-light sticky-top ">

  <NavLink to="/signup" className="navbar-brand"><Logo/></NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">

    <ul className="navbar-nav mr-auto">

    <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Category
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                    <NavLink className="dropdown-item" to='/home/AllCourses' activeClassName="active-category" >All Courses</NavLink>
                   
                   <NavLink className="dropdown-item" to='/home/WebDevelopment' activeClassName="active-category">Web Development </NavLink>
                   <NavLink className="dropdown-item" to='/home/WebDesigning' activeClassName="active-category" >Web Designing </NavLink>
                   <NavLink className="dropdown-item" to='/home/ML' activeClassName="active-category">Machine Learning </NavLink>
                   <NavLink className="dropdown-item" to='/home/Photography' activeClassName="active-category">Photography</NavLink>
                   <NavLink className="dropdown-item" to='/home/IOT' activeClassName="active-category">IOT </NavLink>


           
            </div>
        </li>
    </ul>

    {LoginLinks}
    
  </div>
</nav>

)}
};

export default Navbar;