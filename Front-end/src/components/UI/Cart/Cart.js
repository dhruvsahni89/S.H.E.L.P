import React, {Component} from 'react';
import {NavLink,Redirect} from 'react-router-dom';
import Loader from 'react-loader-spinner';
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
        userName:localStorage.getItem('userName'),
        userId:localStorage.getItem('userId'),
        token:localStorage.getItem('user'),
        redirect:null,
    }


    componentDidMount(){
      
        axios.get(`/users/${this.state.userName}/${this.state.userId}`,{
            headers: {
                
                Authorization: 'Bearer '+ this.state.token
            }
        } )
        .then(response => {

            if(response.status ===200 || response.status===201){
            console.log("Bookmarked Courses",response);
       
            this.setState({Courses: response.data.course.bookmarked});
         
           
            this.setState({loading:false});
            

          

        }})
        .catch(error => {
            console.log(error.response);
            if(error.response.status ===500){
                this.setState({redirect:"/login"})
            }

        })
       
    }

   
    
    
    render(){

        if(this.state.redirect!==null){
            return <Redirect to={this.state.redirect}/>
        }

        let noOfCourses = null;
        let classes=[];
        let title=null;
        
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
                
                data=(<div className="empty-center">
                    <EmptyCart/>
                    </div>);
            }



           else{

            title= (<div>

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
            </div>);



              classes =["flex-row"]
              data = (
              CourseArray.map(item =>  
              
        // <NavLink className="productLink" exact to={`/course/${this.state.CourseLink}/${item._id}`}>
               <CartCard 
                key={item.id}
                title={item.title}
                teacher={item.name}
                img={"http://localhost:8080/" + item.imageurl}
                rating={item.rating}
                courseId={item._id}
                userId={this.state.userId}
                />
        // </NavLink>
        )
    
            );
        }}

        return(
        
        <div className="container">
           
               {title}
 
        <div className={classes.join(' ')}>
            {data}
        </div>


            {/* <CartPrice/>  */}
           
            
        </div>
   
    );
}}

export default Cart;
