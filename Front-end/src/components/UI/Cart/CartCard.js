import React,{Component} from 'react';
//import Webdev from '../../../assets/Images/webdev.png';
import './CSS/Cart.css';
import Rating from '../CoursePage/Rating';
import axios from '../../../ApiServices/axiosUrl'
import Alert from '../../../Auth/Forms/alert'

class CartCard extends Component{



    state={ alert: {
        valid:false,
        msg:"",
        alertType:" ",
    },

    alertPressed:false,

}

AlertError(alertmsg, alertType) {
    const AlertArray = {...this.state.alert};
    AlertArray.msg = alertmsg;
    AlertArray.valid=true;
    AlertArray.alertType=alertType;
    this.setState({alert:AlertArray});

}
     remove =()=> {
        this.setState({alertPressed:true})
        setTimeout( ()=> this.setState({alertPressed:false}) , 3000);
        const fd = new FormData();
        fd.append('_userID',this.props.userId);
        fd.append("_id",this.props.courseId);

        axios.post("/unbookmark",fd )
        .then(response => {
            console.log("Removed",response);
       
            
         
           
            this.setState({loading:false});
           // alert("Course Removed,please refresh");
            this.AlertError("Course Removed,please refresh", "success");
            

          

        })
        .catch(error => {
            console.log(error.response);
        })
    }


    render(){

        let alertContent = null;
        
      
        if(this.state.alert.valid){
            alertContent = ( <Alert value={this.state.alertPressed} 
                alertMsg ={this.state.alert.msg} 
                alertType={this.state.alert.alertType} /> )
        }
        
        
    
   
    return(

    <div className="CartContent">{alertContent}

            <div className="CardMain ">


                    <div className="CardImageParent">
                        <img src={this.props.img} alt="course"/>
                    </div>

                    <div className="CardSideContent">

                            <p class="CourseTitle">{this.props.title}</p>

                            <div className="CardParent1">
                                <p className="CourseTeacher">By {this.props.teacher}</p>
                                <p onClick={this.remove} className="CourseRemove">Remove</p>
                            </div>

                                <div className="CardParent2"> 
                                  
                                        <span className="CourseRating">{this.props.rating}</span>  
                                        <span className="Coursestar"><Rating rating={this.props.rating}/></span> 
                                   

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

}}

export default CartCard;
