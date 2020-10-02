import React, {Component} from 'react';
import TeacherCategory from './TeacherCatergory';
import HomeBanner from '../../HomePage/HomeBanner';
import CourseCards from '../../HomePage/CourseCards';
import CourseTitle from '../../HomePage/CourseTitle';
import {NavLink} from 'react-router-dom';
import Loader from 'react-loader-spinner';

//import ProductApi from './../../../ApiServices/ProductApi';
import axios from "../../../../ApiServices/axiosUrl";

import '../../HomePage/CSS/Homepage.css'



class TeacherHomePage extends Component {

    state = {
        // CourseLink: this.props.match.params.CourseName,
         Courses: null,
         loading: true,
        // img: "",
    }


    componentDidMount(){

        const fd =new FormData();
        fd.append("userId",localStorage.getItem('userId'))

       
     
       
       console.log(this.state.CourseLink)

                axios.post("/teacher/uploads",fd)
                .then(response => {
                    
                    console.log("Teacher Response",response);
                    
                    this.setState({Courses: response.data.data});
                
                    this.setState({loading:false});
                    console.log(this.state.Courses);

                

                })
                .catch(error => {
                    console.log(error);
                })
        

    }
   
    
    


    render(){

        let BannerImage ;
        

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

            data = (
              CourseArray.map(item =>  
              
              <NavLink className="productLink" exact 
              to={`/course/${this.state.CourseLink}/${item._id}`}>
                <CourseCards   
                key={item.id}
                title={item.title}
                teacher={item.name}
                img={"http://localhost:8080/" + item.imageurl}
                rating={item.rating}
                /></NavLink>)
    
            );
            
            BannerImage =   this.state.CourseLink 
            


            };
        
        return(
          
            <div className="container">

                <HomeBanner img={null}/>

                <div className="mt-5 Course-Content"> 
                    <TeacherCategory/>

                    <div className="Course-Content-col">
                   
                                <CourseTitle welcomeMessage ={"Here are your courses, "}/>

                                <div className="Course-Content-wrap">
                                    {data}
                                </div>



                    </div>

                </div>



            </div>
        );
    }

}

export default TeacherHomePage;