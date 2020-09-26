import React from "react";
import './CSS/CategoriesCard.css';

const Categories =(props)=>{


    return(
        <div className="Categories-main">
               <h3 class="Categories-heading"> Categories </h3>

               <h4 className="active-category">All Courses</h4>
               <p>Web Development</p>
               <p>Web Designing</p>
               <p>Graphic Designing</p>
               <p>Machine Learning</p>
               <p>Photography</p>
               <p>IOT</p>

        </div>
     


    );

}

export default Categories;