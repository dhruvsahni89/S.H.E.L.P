import React from 'react';
import './Navbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
//import Logo from '../../../Logo/Logo';
import SideToggler from '../../SideNav/SideToggler/SideToggler';

const navbar = (props)=> (
    
    <header className="Navbar">
        <SideToggler clicked= {props.drawerTogglerClicked} />
        
        <div className="Logo-burger">
            {/* <Logo  /> */}
            <p>LOGO</p>
        </div>
        
        <nav className="DesktopOnly">
                <NavigationItems/>
        </nav>


    </header>
);

export default navbar;