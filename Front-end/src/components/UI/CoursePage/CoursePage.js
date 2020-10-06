import React, {Component} from 'react';
import './CSS/CoursePage.css'
import {NavLink,Redirect} from 'react-router-dom';
import CourseDesc from './CourseDesc';
import CourseVideo from './CourseVideo';
import axios from '../../../ApiServices/axiosUrl';
import VideoList from './VideoList';
import { saveAs } from 'file-saver';
import parse from 'html-react-parser';

class CoursePage extends Component {

    state = {
        CourseId: this.props.match.params.Courseid,
        CourseName:this.props.match.params.Course,
        CoursesInfo: null,
        loading: true,
        token:localStorage.getItem('user'),
        redirect:null,
        playing1:false,
        PlayButton:'fa fa-play-circle',
    }

    componentDidMount(){
      
        axios.get(`/course/${this.state.CourseName}/${this.state.CourseId}`,{
            headers: {
                
                Authorization: 'Bearer '+ this.state.token
            }
        } )
        .then(response => {
            console.log("Courses Response",response);
       
            this.setState({CoursesInfo: response.data.course});
           
            this.setState({loading:false});
            console.log(this.state.CoursesInfo);

          

        })
        .catch(error => {
            console.log(error.response);
            if(error.response.data.message ==='jwt malformed')
            this.setState({redirect:"/login"})
        })
       
    }

    DownloadPdf=()=>{
        axios.get(`/home/download/${this.state.CourseId}` ,{
            headers: {
                
                Authorization: 'Bearer '+ this.state.token
            }
        },
        {responseType: 'blob'}
        )
                
                .then((res)=>{
                    const pdfBlob = new Blob([res.data], {type: 'application/pdf'})

                   saveAs(pdfBlob,'newPdf.pdf');
                })

                .catch(error => {
                    console.log(error);
                    
                })


    }

    PlayPause=()=> {

        
        
        if(this.state.playing1){
            this.setState({playing1:false,PlayButton:'fa fa-play-circle'});
            
        }

        else{
            this.setState({playing1:true,PlayButton:'fa fa-pause-circle'});
          
        }
     }

    

    render(){
        if(this.state.redirect)
        return <Redirect to="/login"/>;


        let title = null;
        let short_description=null;
        let teacher=null;
        let createdAt=null;
        let videoUrl=null;
        let rating=null;
        let requirement=null;
        let longDescription=null;
        let willLearn=null;

        
        

        if(this.state.loading ===false){
                title = (this.state.CoursesInfo.title);
                short_description = (this.state.CoursesInfo.discription);
                teacher=(this.state.CoursesInfo.name)
                createdAt=(this.state.CoursesInfo.createdAt);
                createdAt =createdAt.split("T")[0];
                videoUrl=(this.state.CoursesInfo.videourl);
                rating=(this.state.CoursesInfo.rating);
                requirement=parse(this.state.CoursesInfo.requirement);
                longDescription=parse(this.state.CoursesInfo.discriptionLong);
                willLearn=parse(this.state.CoursesInfo.willLearn);

                if(rating ===0) rating=1;
                

        }
        
       


        return(

          
          
            <div className="container">
                                
                <nav aria-label="breadcrumb">

                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <NavLink to='/home'>
                                    Home
                                </NavLink></li>

                            <li class="breadcrumb-item">
                                <NavLink to={`/Home/${this.state.CourseName}`}

                                >
                                    {this.state.CourseName}
                                </NavLink>
                            </li>


                            <li class="breadcrumb-item">
                                <NavLink to={`/course/${this.state.CourseName}/${this.state.CourseId}`}

                                activeStyle={{textDecoration:'underline'}}>
                                    {title}
                                </NavLink>
                            </li>

                        </ol>
                
                </nav>

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
                                <CourseVideo playing={this.state.playing1} videoUrl={"http://localhost:8080/" 
                                             +videoUrl} />
                            </div>


                     </div>


            <div className="Breakpoint"></div>

           <div className="Section2">
                
                <div className="section2part1">
                
                        <div className="Small-nav-section">

                            <p >About</p>
                            <p>Instructor</p>
                            <p>About</p>


                        </div>


                            
                        <div className="flex-col-requirement">
                            
                            <h1>Requirement of this Course</h1>
                            <p>{requirement}</p>
                    
                        </div>

                            
                        <div className="flex-col-requirement">
                            
                            <h1>Descripton</h1>
                            <p>{ longDescription}</p>
                    
                        </div>

                        <div className="flex-col-requirement">
                            
                            <h1>What will you learn from this course?</h1>
                            <p>{willLearn}</p>
                    
                        </div>


                 </div>

                    <div className="flex-center">
                        <VideoList playing={this.PlayPause} 
                        playButton={this.state.PlayButton}/>
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

            <div className="Download-btn">
                <p onClick={this.DownloadPdf}>Download PDF</p>
            </div>
            


            </div>

        );
    }

}

export default CoursePage;