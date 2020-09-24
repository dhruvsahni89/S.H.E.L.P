import React from "react";
import Banner1 from '../../../assets/Images/banner1.png';
import './CSS/HomeBanner.css';


const HomepageBanner=(props)=>{


    return(
        <div>
           
           <img className="BannerImage" src={Banner1} alt="banner1"/>
           <p className="Banner-text">Best place to <br/>learn new things</p> 
        </div>
     


    );

}

export default HomepageBanner;