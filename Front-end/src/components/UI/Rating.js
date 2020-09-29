import ReactStars from "react-rating-stars-component";
import React, {Component} from "react";

class Rating extends Component {

    render(){

        const ratingChanged = (newRating) => {
            console.log(newRating);
          };

        return(
            
            <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"/>

        );
    }

}

export default Rating