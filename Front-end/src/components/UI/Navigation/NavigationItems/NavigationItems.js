import React from  'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../../hoc/ReactFrag';
//import AuthServices from '../../../../ApiServices/auth.service';


const navigationItems = (props)=> {

    

    let login = (<Aux>
            <NavigationItem link='/login' > Login</NavigationItem>
            <NavigationItem link='/signup'>Sign-up</NavigationItem>
            </Aux>);

    
    if(props.login===true){
       login = <NavigationItem link="/login">Logout</NavigationItem>
    }



    return(
       
        
    <ul className="Navigationitems">
       <NavigationItem link='/signup' btn="teach">Teach on Shelp</NavigationItem>

       {login}
      
   
     </ul>

    )};

export default navigationItems;