import ReactStars from "react-rating-stars-component";
import React, {Component} from "react";
import axios from '../../../ApiServices/axiosUrl';

class Rating extends Component {

  
    render(){
       
      
        let rating = (<p>Rating</p>);

      


        if(this.props.rating){

            
            const ratingChanged = (newRating) => {
            
               
                const fd =new FormData();
              
                
                fd.append('_id',this.props.CourseId);
                fd.append('rating',newRating);
    
                axios.put("/Rating",fd,{
                    headers: {
                        
                        Authorization: 'Bearer '+ localStorage.getItem('user')
                    }
                } )
                .then(response => {
                    console.log("Rating",response);
            
                    
                    this.setState({loading:false});
                   
                  
        
                })
                .catch(error => {
                    console.log(error);
                })
        
            };

              
            rating = (
            <ReactStars
              
                count={5}
              
                onChange={ratingChanged}
                size={24}
                isHalf={true}
                value={this.props.rating}
                activeColor="#ffd700"/>);
        


            }

         



        return(
           <>
            {rating}
           </> 
         


        );
    }

}

export default Rating;