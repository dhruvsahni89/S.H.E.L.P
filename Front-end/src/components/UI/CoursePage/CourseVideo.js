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
          url='http://localhost:8080/Wed Sep 30 2020-sampleVideo.mp4' />

       
      )
    }
  }

export default CourseVideo;