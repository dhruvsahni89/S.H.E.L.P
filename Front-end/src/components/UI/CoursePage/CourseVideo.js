import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import './CSS/CoursePage.css';


class CourseVideo extends Component {
    render () {
      return (
      
       
        <ReactPlayer width='100%' height='100%' url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />

       
      )
    }
  }

export default CourseVideo;