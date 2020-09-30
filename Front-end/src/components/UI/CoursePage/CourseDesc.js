import React from 'react';
import './CSS/CourseDesc.css';
import Rating from '../Rating';
import Play from '../../../assets/Images/play.png';



const CourseDesc =(props)=> {


     

        return(

            <div className="Description-main">

                <p className="Course-title-main">{props.title}</p>
                
                <div className="Course-Rating-section">
                    
                    <Rating value="4"/>
                </div>

                <div className="break1">

                </div>

                <div className="Short-Description">
                    <p>{props.short_description}</p>
                </div>

                <div className="break2">

                </div>


                <div className="Course-Teacher-bookmark">
                    <div className="Course-teacher-name">
                    <p>Created at {props.createdat}</p>
                        <h2>By {props.teacher}</h2>
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
