import React, {Component} from 'react';
import TeacherCategory from './TeacherCatergory';
import HomeBanner from '../../HomePage/HomeBanner';
import CourseTitle from '../../HomePage/CourseTitle';
import {Redirect} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import TeacherCard from './TeacherCard';
import Layout from '../../../Layout/Layout';
//import ProductApi from './../../../ApiServices/ProductApi';
import axios from "../../../../ApiServices/axiosUrl";

import '../../HomePage/CSS/Homepage.css'



class TeacherHomePage extends Component {

    state = {
        // CourseLink: this.props.match.params.CourseName,
         Courses: null,
         loading: true,
         redirect:null,
        // img: "",
    }


    componentDidMount(){

        const fd =new FormData();
        const form = {};
        form['userId'] = localStorage.getItem('userId');

        fd.append("userId",localStorage.getItem('userId'))
       

                axios.post("/teacher/uploads",form,{
                    headers: {
                       
                        Authorization: 'Bearer '+ localStorage.getItem('user') 
                    }
                })
                .then(response => {
                    
                    console.log("Teacher Uploaded Courses",response);
                    
                    this.setState({Courses: response.data.data});
                
                    this.setState({loading:false});
                    console.log(this.state.Courses);

                

                })
                .catch(error => {
                    console.log(error.response);
                    if(error.response.data.message ==="jwt malformed"){
                        this.setState({redirect:'/login'})
                    }
                })
        

    }
   
    
    


    render(){

    //    let BannerImage ;
    if(this.state.redirect){
        return <Redirect to={this.state.redirect}/>
    }
        

        let data = (<Loader
            type="Puff"
            color="#2D81F7"
            height={50}
            width={50}
            className="loader"

             //3 secs
    
         />);

        if(!this.state.loading){
           
            let CourseArray= this.state.Courses.slice(0);

            data = (
              CourseArray.map(item =>  
              
           

                <TeacherCard  
                key={item.id}
                title={item.title}
                teacher={item.name}
                img={"http://localhost:8080/" + item.imageurl}
                rating={item.rating.ratingFinal}
                Link={`/course/${this.state.CourseLink}/${item._id}`}
                CourseId={item._id}
                />)
    
            );
            
           // BannerImage =   this.state.CourseLink 
            


            };
        
        return(
          <Layout>
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
        </Layout>
        );
    }

}

export default TeacherHomePage;