import React,{Component} from "react";
import Banner1 from '../../../assets/Images/banner1.png';
import './CSS/HomeBanner.css';


class HomepageBanner extends Component{

    render(){
        let text=null;

        if(this.props.img === 'all'){
             text = ( <p className="Banner-text">Best place to <br/>learn new things</p> );
        }


    

    return(
        <div className="BannerSection">
           
           <img className="BannerImage" src={"http://localhost:8080/" + this.props.img +".jpg"} alt="banner1"/>
            {text}
        </div>
     


    );
  }
}

export default HomepageBanner;