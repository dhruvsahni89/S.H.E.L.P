import React, {Component} from 'react';
import CartCard from './CartCard';
import './CSS/Cart.css';
import CartPrice from './CartPrice';
import EmptyCart from './EmptyCart';
import axios from '../../../ApiServices/axiosUrl';



class Cart extends Component{

    state = {
        CourseLink: this.props.match.params.CourseName,
        Courses: null,
        loading: true,
        img: "",
    }


    componentDidMount(){
      
        axios.get(`/home/${this.state.CourseLink}` )
        .then(response => {
            console.log("Courses Response",response);
       
            this.setState({Courses: response.data.course});
           
            this.setState({loading:false});
            console.log(this.state);

          

        })
        .catch(error => {
            console.log(error);
        })
       
    }

   
    
    
    render(){return(
        
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
             <EmptyCart/>  
            
        </div>
   
    );
}}

export default Cart;
