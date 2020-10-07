import React,{Component} from "react";
import '../CSS/TeacherHome.css';
import Rating from '../../Rating';
import {Link} from 'react-router-dom';
import axios from '../../../../ApiServices/axiosUrl';

class TeacherCard extends Component{

    DeleteCourse=()=>{

        const fd = new FormData();
        fd.append('courseId',this.props.CourseId);

        axios.post("/Course/delete",fd,{
            headers: {
                Authorization: 'Bearer '+ localStorage.getItem('user') 
            }
        } )
        .then(response => {
            console.log("Removed Course",response);

           // this.setState({loading:false});
             alert("Course Removed,please refresh");
            //this.AlertError("Course Removed,please refresh", "success");
            
        })
        .catch(error => {
            console.log(error);
        })


    }

    render(){

    return(


              <div className="Course-Cards">
                
                      <div className="my-card">
                       <Link className="productLink" to={this.props.Link}> 
                            <img src={this.props.img} alt="img"/>
                        </Link>
                        
                      <div className="TeacherEditSection">
                          <p className="TeacherCourse-Title">{this.props.title}</p>

                <Link to={{
                    pathname:'/TeacherEdit',
                    aboutProps:{CourseId: this.props.CourseId}
                }}>
                    <p class="fa fa-pencil" aria-hidden="true"></p>
                </Link>

                     </div>

                     <div className="TeacherDeleteSection">
                        <p className="Teacher-Course-Teacher">{this.props.teacher}</p>
                        <i onClick={this.DeleteCourse} class="fa fa-trash" aria-hidden="true"></i>
                     </div>
                          <p className="Course-info"> 

                            <span className="Course-rating">{this.props.rating}</span>  
                            <span className="Course-star"> <Rating rating={this.props.rating}/></span> 
                            <span className="Course-Price">₹ 500</span>
                          </p>

                      </div>


            

               </div>



      );

      }}

export default TeacherCard;


             