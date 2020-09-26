import React from 'react';
import Webdev from '../../../assets/Images/webdev.png';
import './CSS/Cart.css';

const CartCard =(props)=> {


    return(

    <div className="CartContent">

            <div className="CardMain ">


                    <div className="CardImageParent">
                        <img src={Webdev} alt="course"/>
                    </div>

                    <div className="CardSideContent">

                            <p class="CourseTitle">Compelete web development:<br/>Beginner to advance</p>

                            <div className="CardParent1">
                                <p className="CourseTeacher">Teacher name</p>
                                <p className="CourseRemove">Remove</p>
                            </div>

                                <div className="CardParent2"> 
                                    <div>
                                        <span className="CourseRating">4.5</span>  
                                        <span className="Coursestar"> STARS</span> 
                                    </div>

                                    <p className="CourseSave">Save for Later</p>

                                </div>

                                
                                <div className="CardParent3">
                                    <p className="CoursePrice">₹ 500</p>
                                    <p className="CourseWhishlist">Move to Whishlist</p>
                                </div>

                                <div className="CourseBuy"> <p>Buy Now</p></div>
                                

                    </div>



            </div>






            <div className="CardMain">


    <div className="CardImageParent">
        <img src={Webdev} alt="course"/>
    </div>

    <div className="CardSideContent">

            <p class="CourseTitle">Compelete web development:<br/>Beginner to advance</p>

            <div className="CardParent1">
                <p className="CourseTeacher">Teacher name</p>
                <p className="CourseRemove">Remove</p>
            </div>

                <div className="CardParent2"> 
                    <div>
                        <span className="CourseRating">4.5</span>  
                        <span className="Coursestar"> STARS</span> 
                    </div>

                    <p className="CourseSave">Save for Later</p>

                </div>

                
                <div className="CardParent3">
                    <p className="CoursePrice">₹ 500</p>
                    <p className="CourseWhishlist">Move to Whishlist</p>
                </div>

                <div className="CourseBuy"> <p>Buy Now</p></div>
                

    </div>







</div>




<div className="CardMain">


<div className="CardImageParent">
    <img src={Webdev} alt="course"/>
</div>

<div className="CardSideContent">

        <p class="CourseTitle">Compelete web development:<br/>Beginner to advance</p>

        <div className="CardParent1">
            <p className="CourseTeacher">Teacher name</p>
            <p className="CourseRemove">Remove</p>
        </div>

            <div className="CardParent2"> 
                <div>
                    <span className="CourseRating">4.5</span>  
                    <span className="Coursestar"> STARS</span> 
                </div>

                <p className="CourseSave">Save for Later</p>

            </div>

            
            <div className="CardParent3">
                <p className="CoursePrice">₹ 500</p>
                <p className="CourseWhishlist">Move to Whishlist</p>
            </div>

            <div className="CourseBuy"> <p>Buy Now</p></div>
            

</div>







</div>



    </div>


    );

}

export default CartCard;
