import React from 'react';
import Empty from '../../../assets/Images/EmptyCart.png';
import './CSS/EmptyCart.css';

const EmptyCart =(props)=> {


    return(

   <div className="EmptyCartMain">
        <div className="EmptyCartLogo" >
            <img  src={Empty} alt="emptyCart"/>
        </div>

        <div className="EmptyCartDesc">
            <p>Nothing in Whishlist</p>
        </div>

        <div>
            <button className="HomeButton">Go Home</button>
        </div>

   </div>
    );

}

export default EmptyCart;
