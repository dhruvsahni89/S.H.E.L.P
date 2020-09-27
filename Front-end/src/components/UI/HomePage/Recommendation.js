import React from "react";
import './CSS/Homepage.css';
import InterestBanner from '../../../assets/Images/GreenBanner.png';


const Recommendation =(props)=>{


    return(

        <div className="Interest-banner">
            <img src={InterestBanner} alt="interestbanner"/>
            <p>Get Course Recommendation <br/>according to your Interest    </p>
            <button>Choose Interest</button>
        </div>
     


    );

}

export default Recommendation;