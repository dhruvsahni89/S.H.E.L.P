import React, {Component} from 'react';
import './CSS/CoursePage.css'
import {NavLink,Redirect} from 'react-router-dom';
import CourseDesc from './CourseDesc';
import CourseVideo from './CourseVideo';
import axios from '../../../ApiServices/axiosUrl';
import VideoList from './VideoList';
import Layout from '../../Layout/Layout';
import parse from 'html-react-parser';

class CoursePage extends Component {

    state = {
        CourseId: this.props.match.params.Courseid,
        CourseName:this.props.match.params.Course,
        CoursesInfo: null,
        loading: true,
        token:localStorage.getItem('user'),
        redirect:null,
        CurrentVideo:'',
        playing:false,
        PlayButton:'fa fa-play-circle',

        // Video0:{
        //     'video0':false,
        //     'videoName':'',
        // }

        // Video1:{
        //     'video1':false,
        //     'videoName':'',
        // }

        // Video2:{
        //     'video2':false,
        //     'videoName':'',
        // }


        // Video3:{
        //     'video3':false,
        //     'videoName':'',
        // }

        // Video4:{
        //     'video4':false,
        //     'videoName':'',
        // },

        'video0':true,
         'video1':false,
         'video2':false,
         'video3':false,
         'video4':false,

         'CurrentVideo0':'',
         'CurrentVideo1':'',
         'CurrentVideo2':'',
         'CurrentVideo3':'',
         'CurrentVideo4':'',





     }

    componentDidMount(){
      
        axios.get(`/course/${this.state.CourseName}/${this.state.CourseId}`,{
            headers: {
                
                Authorization: 'Bearer '+ this.state.token
            }
        } )
        .then(response => {
            console.log("CoursePage Response",response);
       
            this.setState({CoursesInfo: response.data.course});
            this.setState({CurrentVideo:response.data.course.videourl[0]})
            this.setState({loading:false});
            console.log(this.state.CoursesInfo);

          

        })
        .catch(error => {
            console.log(error.response);
            if(error.response.data.message ==='jwt malformed')
            if(error.response.status ===500)
            this.setState({redirect:"/login"})
        })
       
    }


    
    VideochangeHandler=(event,video,index,playing)=> {
       let VideoNumber = 'video' + index;
       this.setState({CurrentVideo:video})
       console.log("before=",this.state[VideoNumber]);
      // this.setState({[VideoNumber]:!this.state[VideoNumber]})

      for(let i=0;i<5;i++){
        if(i===index){
            this.setState({[VideoNumber]:true})
        }
        else{
            this.setState({['video'+i]:false})
        }
      }


       //this.setState(prevState => 
        //({[VideoNumber]:prevState[VideoNumber]}));

        //console.log("STATE"+index,this.state[VideoNumber])
        //console.log(this.state)

        if(playing){
            this.setState({playing:true})
        }
        else{
            this.setState({playing:false})
        }
       // console.log("boolean=",playing)
        //console.log("PLAYING STATE=",this.state.playing);
    }
   

    

    render(){
        if(this.state.redirect)
        return <Redirect to={this.state.redirect}/>;


        let title = null;
        let short_description=null;
        let teacher=null;
        let createdAt=null;
        let VideoUrl=null;
        let rating=null;
        let ratingtimesUpdated=null;
        let requirement=null;
        let longDescription=null;
        let willLearn=null;
        let videourl=null;
        let CurrentVideo="";
        let playButton='';
        let playingVideo=false;

        if(this.state.loading ===false){
                

                title = (this.state.CoursesInfo.title);
                short_description = (this.state.CoursesInfo.discription);
                teacher=(this.state.CoursesInfo.name)
                createdAt=(this.state.CoursesInfo.createdAt);
                createdAt =createdAt.split("T")[0];
                //videoUrl=(this.state.CoursesInfo.videourl);
                rating=(this.state.CoursesInfo.rating.ratingFinal);
                requirement=parse(this.state.CoursesInfo.requirement);
                longDescription=parse(this.state.CoursesInfo.discriptionLong);
                willLearn=parse(this.state.CoursesInfo.willLearn);
                ratingtimesUpdated=(this.state.CoursesInfo.rating.timesUpdated);
                videourl=(this.state.CoursesInfo.videourl.slice(0));
               // this.setState({CurrentVideo:videourl[0]});
                CurrentVideo = "http://localhost:8080/" + this.state.CurrentVideo;



                if(rating ===0) rating=1;
                
                
                VideoUrl= (
                    videourl.map((video,index)=>{
                    let VideoNumber ='video'+index;
                   
                    if(this.state[VideoNumber]){

                        playButton='VideoSelected';
                        playingVideo=true;
                    
                    }
                    else{
                        playButton='VideoNotSelected';
                        playingVideo=false;
                       
                    }
                
               return(

                    <VideoList
                    key={index}
                    video={video}
                    changed={(event)=> this.VideochangeHandler(event,video,index,playingVideo)}
                    playButton={playButton}
                    
                    
                    />)
            
                
                     } )
                );

        }
        
       


        return(

          
          <Layout>
            <div className="container">
                                
                <nav aria-label="breadcrumb">

                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <NavLink to='/home'>
                                    Home
                                </NavLink></li>

                            <li class="breadcrumb-item">
                                <NavLink to={`/Home/${this.state.CourseName}`}

                                >
                                    {this.state.CourseName}
                                </NavLink>
                            </li>


                            <li className="breadcrumb-item">
                                <NavLink to={`/course/${this.state.CourseName}/${this.state.CourseId}`}

                                activeStyle={{textDecoration:'underline'}}>
                                    {title}
                                </NavLink>
                            </li>

                        </ol>
                
                </nav>

                    <div className="Main-Section">
                    
                        

                        <div className="Description-main">
                            <CourseDesc title={title}
                                        short_description={short_description}
                                        teacher={teacher}
                                        createdat={createdAt}
                                        CourseId={this.state.CourseId}
                                        rating={rating}
                                        ratingtimesUpdated={ratingtimesUpdated}
                                        CourseName={this.state.CourseName}
                            />

                        </div>

                            <div className="Course-Video">
                           
                                <CourseVideo playing={this.state.playing} 
                                    videoUrl={CurrentVideo}
                                              />
                            </div>


                     </div>


            <div className="Breakpoint"></div>

           <div className="Section2">
                
                <div className="section2part1">
                
                        <div className="Small-nav-section">

                            <p >About</p>
                            {/* <p>Instructor</p>
                            <p>About</p> */}


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
                        {/* <VideoList playing={this.PlayPause} 
                        playButton={this.state.PlayButton}/> */}

                        {VideoUrl}
    
                      
                        
                       
                          
                     </div>

                    

            </div>

       
            


        </div>
        </Layout>

        );
    }

}

export default CoursePage;