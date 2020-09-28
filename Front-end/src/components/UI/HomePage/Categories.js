import React from "react";
import './CSS/CategoriesCard.css';
import {NavLink} from 'react-router-dom'

const Categories =(props)=>{


    return(

        <div className="CategoryDevider">


                <div className="Categories-main">
                
                <h3 className="Categories-heading"> Categories </h3>


            <div className="ListOfCourses">
                  <NavLink to='/home/AllCourses' activeClassName="active-category" >All Courses</NavLink>
                   
                  <NavLink to='/home/WebDevelopment' activeClassName="active-category">Web Development </NavLink>
                  <NavLink to='/home/WebDesigning' activeClassName="active-category" >Web Designing </NavLink>
                  <NavLink to='/home/ML' activeClassName="active-category">Machine Learning </NavLink>
                  <NavLink to='/home/Photography' activeClassName="active-category">Photography</NavLink>
                  <NavLink to='/home/IOT' activeClassName="active-category">IOT </NavLink>
                
            </div>
                </div>

                <div className="Course-Devider">

                </div>

        </div>


     


    );

}

export default Categories;