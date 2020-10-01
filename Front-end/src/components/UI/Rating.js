import ReactStars from "react-rating-stars-component";
import React, {Component} from "react";
import axios from '../../ApiServices/axiosUrl';

class Rating extends Component {

    render(){

        const ratingChanged = (newRating) => {
            
            console.log(this.props.CourseId)
            const fd =new FormData();
          

            fd.append('_id','5f7592d1452b724dfcd65c87');
            fd.append('rating',newRating);

            axios.put("/Rating",fd )
            .then(response => {
                console.log("Rating",response);
        
                
                this.setState({loading:false});
               
              
    
            })
            .catch(error => {
                console.log(error);
            })
    
          };




        return(
            
            <ReactStars
            count={5}
            initialRating={3}
            onChange={ratingChanged}
            size={24}
            isHalf={true}
            value={2}
            activeColor="#ffd700"/>

        );
    }

}

export default Rating;