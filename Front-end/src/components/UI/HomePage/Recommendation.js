import React from "react";
import './CSS/Homepage.css';
import InterestBanner from '../../../assets/Images/banner1.png';


const Recommendation =(props)=>{


    return(
        <div className="Interest-banner">
            <img src={InterestBanner} alt="interestbanner"/>
            <p>Get Course Recommendation <br/>according to your Interest</p>
            <span>Choose Interest</span>
        </div>
     


    );

}

export default Recommendation;