import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import './CSS/CoursePage.css';


class CourseVideo extends Component {
    render () {
      return (
      
       
        <ReactPlayer 
        width='100%'
         height='100%'
         controls={true}
          url={this.props.videoUrl} />

       
      )
    }
  }

export default CourseVideo;