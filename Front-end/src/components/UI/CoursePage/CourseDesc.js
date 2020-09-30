import React from 'react';
import './CSS/CourseDesc.css';
import Rating from '../Rating';
import Play from '../../../assets/Images/play.png';



const CourseDesc =(props)=> {


     

        return(

            <div className="Description-main">

                <p className="Course-title-main">Complete Web Development Course: Beginner to advance</p>
                
                <div className="Course-Rating-section">
                    
                    <Rating/>
                </div>

                <div className="break1">

                </div>

                <div className="Short-Description">
                    <p>You will need to have React in your project in order 
                        to use the component, I didn't bundle React in the build, 
                        because it seemed like a crazy idea.</p>
                </div>

                <div className="break2">

                </div>


                <div className="Course-Teacher-bookmark">
                    <div className="Course-teacher-name">
                        <p>Created by</p>
                        <h2>Teacher name</h2>
                    </div>

                <div className="flex-row">
                        <div className="play-btn">
                            <img src={Play} alt="play"/>
                            
                        </div>

                        <div className="Bookmarkbtn">
                            <i class="fa fa-bookmark-o" aria-hidden="true"></i> 
                            <p>BookMark</p>                     
                        </div>
                </div>

                    
                </div>


            </div>
        );
    
}

export default CourseDesc;
