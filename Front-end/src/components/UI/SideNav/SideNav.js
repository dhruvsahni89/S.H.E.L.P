import React from 'react';
import './SideNav.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/ReactFrag';

const sideNav = (props)=> {

    let drawer =["Open", "Close"];

    if(props.open){
        drawer =["SideDrawer","Open"];
    }
    else drawer=["SideDrawer","Close"];

    return(
        <Aux>
            <Backdrop show = {props.open} clicked={props.clicked} />
        <div className={drawer.join(' ')} >

            <div className="LogO" >
                <Logo /> 
              
            </div>
            

            <nav>
                <NavigationItems/>
            </nav>


            </div>
    
        </Aux>
    );

}

export default sideNav;