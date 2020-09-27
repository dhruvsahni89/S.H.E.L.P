import React from 'react';
import CartCard from './CartCard';
import './CSS/Cart.css';
import CartPrice from './CartPrice';
import EmptyCart from './EmptyCart';
const Cart =(props)=> {


    return(
        
        <div className="container">
           
           <div className='row'>
               <div className="col-12">
                   <p className="CartTitle" >My Cart</p>
                </div>
            </div>

                 
           <div className='row'>
               <div className="col-12">
                   <p className="CartSubTitle" >2 Courses in Cart</p>
                </div>
            </div>
               

    
            <CartCard/>
            <CartPrice/> 
            {/* <EmptyCart/>  */}
            
        </div>
   
    );
}

export default Cart;
