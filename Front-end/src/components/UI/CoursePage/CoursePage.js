import React, {Component} from 'react';
import './CSS/CoursePage.css'
import CourseDesc from './CourseDesc';
import CourseVideo from './CourseVideo';


class CoursePage extends Component {

    

    render(){
        

        
        return(
          
            <div className="container">

                <div className="Main-Section">

                    <div>
                        <CourseDesc/>
                    </div>

                    <div className="Course-Video">
                        <CourseVideo/>
                    </div>


                </div>

            <div className="Breakpoint"></div>

            <div className="Small-nav-section">

                <p>About</p>
                <p>Instructor</p>
                <p>About</p>


            </div>


                
            <div className="flex-col-requirement">
                
                <h1>Requirement of this Course</h1>
                <p>load the full player once a user has interacted
                     with the image. Noembed is used to fetch th</p>
                <p>load the full player once a user has interacted 
                    with the image. Noembed is used to fetch th</p>
           
            </div>

                 
            <div className="flex-col-requirement">
                
                <h1>Descripton</h1>
                <p>load the full player once a user has interacted
                     with the image. Noembed is used to fetch 
                load the full player once a user has interacted 
                    with the image. Noembed is used to fetch th</p>
           
            </div>




            </div>

        );
    }

}

export default CoursePage;