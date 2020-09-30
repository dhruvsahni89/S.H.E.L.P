import ReactStars from "react-rating-stars-component";
import React, {Component} from "react";
import axios from '../../ApiServices/axiosUrl';

class Rating extends Component {

    render(){

        const ratingChanged = (newRating) => {
            
            alert()
            const fd =new FormData();
          
            fd.append('_id',this.props.CourseId);
            fd.append('Rating',newRating)
            axios.post(`/bookmark/${this.props.CourseId}/${this.props.CourseName}`,fd )
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