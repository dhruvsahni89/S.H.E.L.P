import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import './CSS/CoursePage.css';
import ProgressBar from 'react-bootstrap/ProgressBar';


class CourseVideo extends Component {

  state={
    progress:0,
    duration:0,
  }

  HandleProgress=(state)=>{
  
    let progress =( (state.playedSeconds/this.state.duration)*100);
    //console.log(this.state.duration, state.played, ":",progress)
    this.setState({progress:progress})
  
  }

  HandleDuration = (state)=> {
    console.log(state)
    this.setState({duration:state})
  }

    render () {
      return (
      
        <div className='player-wrapper'> 
        <ReactPlayer 
        className='react-player'
        width='100%'
         height='100%'
         controls={true}
         onProgress={this.HandleProgress}
         onDuration={this.HandleDuration}
         playing={this.props.playing}
        url={this.props.videoUrl} />
       
        <div className="mt-5">
        <ProgressBar now={this.state.progress} />
        </div>
        
        </div>
       
      )
    }
  }

export default CourseVideo;