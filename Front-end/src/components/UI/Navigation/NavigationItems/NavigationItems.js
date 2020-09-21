import React from  'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props)=> (
    <ul className="Navigationitems">
      <NavigationItem link='/login' > Login</NavigationItem>
      <NavigationItem link='/signup'>Sign-up</NavigationItem>
   
     </ul>
);

export default navigationItems;