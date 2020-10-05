import React from "react";
import '../../HomePage/CSS/CategoriesCard.css';
import {NavLink} from 'react-router-dom'

const TeacherCategory =(props)=>{


    return(

        <div className="CategoryDevider">


                <div className="Categories-main">
                
                <h3 className="Categories-heading"> Dashboard</h3>


            <div className="ListOfCourses">
                  <NavLink to='/home/all' activeClassName="active-category" >Your Courses</NavLink>
                  <NavLink to='/home/Web Development' activeClassName="active-category">Message</NavLink>
                  
            </div>
                </div>

                <div className="Course-Devider">

                </div>

        </div>


     


    );

}

export default TeacherCategory;