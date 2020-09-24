import React from  'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props)=> (
    <ul className="Navigationitems">
       <NavigationItem link='/signup' btn="teach">Teach on Shelp</NavigationItem>
      <NavigationItem link='/login' > Login</NavigationItem>
      <NavigationItem link='/signup'>Sign-up</NavigationItem>
   
     </ul>
);

export default navigationItems;