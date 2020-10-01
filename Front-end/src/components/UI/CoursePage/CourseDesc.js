import React,{Component} from 'react';
import './CSS/CourseDesc.css';
import Rating from '../Rating';
import Play from '../../../assets/Images/play.png';
import axios from '../../../ApiServices/axiosUrl';




class CourseDesc extends Component {


    state ={
        bookmarked:false,
        CourseId:this.props.CourseId,
    }

    bookmark=()=> {

        let user = localStorage.getItem('userId');
        

        if(!this.state.bookmarked){

                
            const fd =new FormData();
                fd.append('_userID',user);
                fd.append('_id',this.state.CourseId);
                
                axios.post(`/home/${this.state.CourseId}/${this.props.CourseName}`,fd )

                .then(response => {
                    console.log("BookMarked",response);
                    if(response.status ===201 || response.status ===200){
                        this.setState({bookmarked:true})
                        
                    }
                    
                    
                   // this.setState({loading:false});
                
                

                })
                .catch(error => {
                    console.log(error);
                })

                    

                
        }   
        else{
                
                this.setState({bookmarked:false})
                

            }


        }   

    


     render(){
         console.log(this.state.bookmarked)

            let classArray = [""];

            if(this.state.bookmarked) {
                classArray = ["bookmarked-color","fa fa-bookmark"]
            }
            else{
                classArray= ["fa fa-bookmark-o"]
            }

        return(

            <div className="Description-main">

                <p className="Course-title-main">{this.props.title}</p>
                
                <div className="Course-Rating-section">
                    
                    <Rating value={this.props.rating} CourseId={this.state.CourseId} />

                </div>

                <div className="break1">

                </div>

                <div className="Short-Description">
                    <p>{this.props.short_description}</p>
                </div>

                <div className="break2">

                </div>


                <div className="Course-Teacher-bookmark">
                    <div className="Course-teacher-name">
                    <p>Created at {this.props.createdat}</p>
                        <h2>By {this.props.teacher}</h2>
                    </div>

                <div className="flex-row">
                        <div className="play-btn">
                            <img src={Play} alt="play"/>
                            
                        </div>

                        <div className="Bookmarkbtn">
                        <i onClick={this.bookmark}  className={classArray.join(' ')} aria-hidden="true"></i>
                            <p>BookMark</p>                     
                        </div>
                </div>

                    
                </div>


            </div>
        );
    
  }}

export default CourseDesc;
