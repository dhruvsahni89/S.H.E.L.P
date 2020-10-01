import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import CartCard from './CartCard';
import './CSS/Cart.css';
import CartPrice from './CartPrice';
import EmptyCart from './EmptyCart';
import axios from '../../../ApiServices/axiosUrl';
import Loader from 'react-loader-spinner';



class Cart extends Component{

    state = {
        CourseLink: this.props.match.params.CourseName,
        Courses: null,
        
        loading: true,
        img: "",
        userName:localStorage.getItem('userName'),
        userId:localStorage.getItem('userId')
    }


    componentDidMount(){
      
        axios.get(`/users/${this.state.userName}/${this.state.userId}` )
        .then(response => {
            console.log("Bookmarked Courses",response);
       
            this.setState({Courses: response.data.course.bookmarked});
         
           
            this.setState({loading:false});
            

          

        })
        .catch(error => {
            console.log(error);
        })
       
    }

   
    
    
    render(){

        let noOfCourses = null;
        
        let data = (<Loader
            type="Puff"
            color="#08BD80"
            height={50}
            width={50}
            className="loader"

             //3 secs
    
         />);

        if(!this.state.loading){
            
           
            let CourseArray= this.state.Courses.slice(0);
            noOfCourses = CourseArray.length;

            if(CourseArray.length ===0){
                data=<EmptyCart/>
            }

           else{
             
              data = (
              CourseArray.map(item =>  
              
        <NavLink className="productLink" exact to={`/course/${this.state.CourseLink}/${item._id}`}>
               <CartCard 
                key={item.id}
                title={item.title}
                teacher={item.name}
                img={"http://localhost:8080/" + item.imageurl}
                rating={item.rating}
                />
        </NavLink>)
    
            );
        }}

        return(
        
        <div className="container">
           
           <div className='row'>
               <div className="col-12">
                   <p className="CartTitle" >My Courses</p>
                </div>
            </div>

                 
           <div className='row'>
               <div className="col-12">
                   <p className="CartSubTitle" >You have {noOfCourses} Courses!</p>
                </div>
            </div>
               

        <div className="flex-row">
                {data}
        </div>


            <CartPrice/> 
           
            
        </div>
   
    );
}}

export default Cart;
