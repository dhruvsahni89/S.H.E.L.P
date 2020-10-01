import React, {Component} from 'react';
import Categories from './Categories';
import HomeBanner from './HomeBanner';
import CourseCards from './CourseCards';
import CourseTitle from './CourseTitle';
import {NavLink} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import CoursePage from '../CoursePage/CoursePage';
//import ProductApi from './../../../ApiServices/ProductApi';
import axios from "../../../ApiServices/axiosUrl";
import Recommendation from './Recommendation';
import './CSS/Homepage.css';



class Homepage extends Component {

    state = {
        CourseLink: this.props.match.params.CourseName,
        Courses: null,
        loading: true,
        img: "",
    }


    componentDidMount(){

        const fd =new FormData();
        fd.append("userId",localStorage.getItem('userId'))

       
       if(this.state.CourseLink === "preferences"){
        axios.post(`/home/${this.state.CourseLink}`,fd)
        .then(response => {
            console.log("Courses Response",response);
            
            this.setState({Courses: response.data.coursesarray});
           
            this.setState({loading:false});
            console.log(this.state.Courses);

          

        })
        .catch(error => {
            console.log(error);
        })
       
       }
       else{ console.log(this.state.CourseLink)
                axios.get(`/home/${this.state.CourseLink}`)
                .then(response => {
                    console.log("Courses Response",response);
                    
                    this.setState({Courses: response.data.course});
                
                    this.setState({loading:false});
                    console.log(this.state.Courses);

                

                })
                .catch(error => {
                    console.log(error);
                })
        }

         axios.get(`/home/download/${this.state.CourseLink}`)
                
                    .then(async res => {
                        if (res.status === 200 || res.status ===201) {
                          const blob = await res.blob();

                          const file = new Blob(
                            [blob], 
                            {type: 'application/pdf'}
                          );
                          //Build a URL from the file
                          const fileURL = URL.createObjectURL(file);
                          //Open the URL on new Window
                          window.open(fileURL);  
                }})
                .catch(error => {
                    console.log(error);
                })


    }

   
    
    


    render(){
        

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
              
              <NavLink className="productLink" exact to={`/course/${this.state.CourseLink}/${item._id}`}>
                <CourseCards   
                key={item.id}
                title={item.title}
                teacher={item.name}
                img={"http://localhost:8080/" + item.imageurl}
                /></NavLink>)
    
            );
            


            };
        
        return(
          
            <div className="container">

                <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <NavLink strict to='/home'>
                                    Home
                                </NavLink></li>

                            <li class="breadcrumb-item">
                                <NavLink to={`/Home/${this.state.CourseLink}`}activeStyle={{textDecoration:'underline'}}>{this.state.CourseLink}
                                </NavLink>
                            </li>

                        </ol>
                
                </nav>

                <HomeBanner/>

                <div className="mt-5 Course-Content"> 
                    <Categories/>
                    <div className="Course-Content-col">
                   
                                <CourseTitle welcomeMessage ={"Welcome"}/>

                                <div className="Course-Content-wrap">
                                    {data}
                                </div>


                                <Recommendation/>

                    </div>

                </div>



            </div>
        );
    }

}

export default Homepage;