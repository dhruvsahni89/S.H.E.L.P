import React from "react";
import './CSS/CategoriesCard.css';

const Categories =(props)=>{


    return(

        <div className="CategoryDevider">


                <div className="Categories-main">
                    <h3 className="Categories-heading"> Categories </h3>

                    <h4 className="active-category">All Courses</h4>
                    <p>Web Development</p>
                    <p>Web Designing</p>
                    <p>Graphic Designing</p>
                    <p>Machine Learning</p>
                    <p>Photography</p>
                    <p>IOT</p>

                </div>

                <div className="Course-Devider">

                </div>

        </div>


     


    );

}

export default Categories;