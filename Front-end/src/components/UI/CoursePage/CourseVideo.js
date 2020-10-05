import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import './CSS/CoursePage.css';


class CourseVideo extends Component {
    render () {
      return (
      
        <div className='player-wrapper'> 
        <ReactPlayer 
        className='react-player'
        width='100%'
         height='100%'
         controls={true}
         playing={this.props.playing}
          url={this.props.videoUrl} />
        </div>
       
      )
    }
  }

export default CourseVideo;