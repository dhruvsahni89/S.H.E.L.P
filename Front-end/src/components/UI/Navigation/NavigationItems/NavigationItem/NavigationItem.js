 
import React from 'react';
import './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) =>{

    
    
    let navClasses = [];

    if(props.btn ==="teach") navClasses =["NavigationItem-teach"];
    
    else navClasses =["NavigationItem"];

    return(
        <li className= {navClasses.join(' ')} > 
            <NavLink to={props.link}>
            {props.children}
            </NavLink>
            
        </li>);

};

export default navigationItem;