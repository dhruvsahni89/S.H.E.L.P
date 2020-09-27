import React, {Component} from 'react';
import Aux from '../../hoc/ReactFrag';
import  './Layout.css';
import Navbar from '../UI/Navigation/Navbar/Navbar';
import SideNav from '../UI/SideNav/SideNav';


class Layout extends Component
 {

     state = {
         showhand:false
    }

     sideDrawerHandler= ()=> {
         this.setState({showhand:false})
     }

     sideDrawerToggleHandler = ()=>{

         this.setState( (prevState) => {
            
           return  {showhand:!prevState.showhand};
          
     });
 }


    render(){

        

    return (
        <Aux>

        <Navbar drawerTogglerClicked={this.sideDrawerToggleHandler}/>
        <SideNav clicked = {this.sideDrawerHandler} open= {this.state.showhand}/>

        <main className="Content">
            {this.props.children}
        </main>
        
        </Aux>
    );
        

    }
 }

export default Layout;