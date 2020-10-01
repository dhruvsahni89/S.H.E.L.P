import React, {Component} from 'react';
import './CSS/CoursePage.css'
import CourseDesc from './CourseDesc';
import CourseVideo from './CourseVideo';
import axios from '../../../ApiServices/axiosUrl';
import VideoList from './VideoList';

class CoursePage extends Component {

    state = {
        CourseId: this.props.match.params.Courseid,
        CourseName:this.props.match.params.Course,
        CoursesInfo: null,
        loading: true,
        
    }

    componentDidMount(){
      
        axios.get(`/course/${this.state.CourseName}/${this.state.CourseId}` )
        .then(response => {
            console.log("Courses Response",response);
       
            this.setState({CoursesInfo: response.data.course});
           
            this.setState({loading:false});
            console.log(this.state.CoursesInfo);

          

        })
        .catch(error => {
            console.log(error);
        })
       
    }



    

    render(){
        
        let title = null;
        let short_description=null;
        let teacher=null;
        let createdAt=null;
        let videoUrl=null;
        let rating=null;

        if(this.state.loading ===false){
                title = (this.state.CoursesInfo.title);
                short_description = (this.state.CoursesInfo.discription);
                teacher=(this.state.CoursesInfo.name)
                createdAt=(this.state.CoursesInfo.createdAt);
                createdAt =createdAt.split("T")[0];
                videoUrl=(this.state.CoursesInfo.videourl);
                rating=(this.state.CoursesInfo.rating)

        }
        
        return(
          
            <div className="container">
                                
                    <div className="Main-Section">

                        <div>
                            <CourseDesc title={title}
                                        short_description={short_description}
                                        teacher={teacher}
                                        createdat={createdAt}
                                        CourseId={this.state.CourseId}
                                        rating={rating}
                                        CourseName={this.state.CourseName}
                            />
                        </div>

                            <div className="Course-Video">
                                <CourseVideo videoUrl={"http://localhost:8080/" + videoUrl} />
                            </div>


                     </div>


            <div className="Breakpoint"></div>

           <div className="Section2">
                
                <div className="section2part1">
                
                        <div className="Small-nav-section">

                            <p>About</p>
                            <p>Instructor</p>
                            <p>About</p>


                        </div>


                            
                        <div className="flex-col-requirement">
                            
                            <h1>Requirement of this Course</h1>
                            <p>load the full player once a user has interacted
                                with the image. Noembed is used to fetch th</p>
                            <p>load the full player once a user has interacted 
                                with the image. Noembed is used to fetch th</p>
                    
                        </div>

                            
                        <div className="flex-col-requirement">
                            
                            <h1>Descripton</h1>
                            <p>load the full player once a user has interacted
                                with the image. Noembed is used to fetch 
                            load the full player once a user has interacted 
                                with the image. Noembed is used to fetch th</p>
                    
                        </div>

                 </div>

                    <div className="flex-center">
                        <VideoList/>
                        <VideoList/>
                        <VideoList/>

                        <VideoList/>
                        <VideoList/>
                        <VideoList/>
                         <VideoList/>
                         <VideoList/>
                         <VideoList/>
                         <VideoList/>
                         <VideoList/>
                        
                          <VideoList/>
                    </div>

            </div>


            </div>

        );
    }

}

export default CoursePage;