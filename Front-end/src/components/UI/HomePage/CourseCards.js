import React from "react";
import './CSS/CategoriesCard.css';
import Webdev from '../../../assets/Images/webdev.png';
import Python from '../../../assets/Images/python.png';
import ML from '../../../assets/Images/ml.png';

const CourseCards =(props)=>{


    return(
        <div class="Cards-section">

            <div className="Course-Devider"></div>

            <div >
              <h3 className="CategoriesTitle"> Trending Courses </h3>
              <div className="Course-Cards">
                  <div class="my-card">
                      <img src={Webdev} alt="course"/>
                      <p class="Course-Title">Compelete web development:<br/>Beginner to advance</p>
                      <p className="Course-Teacher">Teacher name</p>

                      <p className="Course-info"> 
                        <span className="Course-rating">4.5</span>  
                        <span className="Course-star"> STARS</span> 
                        <span className="Course-Price">₹ 500</span>
                      </p>

                  </div>


                  <div class="my-card">
                      <img src={Python} alt="course"/>
                      <p class="Course-Title">Compelete web development:<br/>Beginner to advance</p>
                      <p className="Course-Teacher">Teacher name</p>

                      <p className="Course-info"> 
                        <span className="Course-rating">4.5</span>  
                        <span className="Course-star"> STARS</span> 
                        <span className="Course-Price">₹ 500</span>
                      </p>

                  </div>


                  <div class="my-card">
                      <img src={ML} alt="course"/>
                      <p class="Course-Title">Compelete web development:<br/>Beginner to advance</p>
                      <p className="Course-Teacher">Teacher name</p>

                      <p className="Course-info"> 
                        <span className="Course-rating">4.5</span>  
                        <span className="Course-star"> STARS</span> 
                        <span className="Course-Price">₹ 500</span>
                      </p>

                  </div>


              </div>

              </div>

        </div>
     


    );

}

export default CourseCards;