import React, {Component} from 'react';
import './CSS/VideoList.css';

class VideoList extends Component{

 
    
    render(){
      

            return(
            <div className="video-list">
                
                <div className="play-title">
                
                <i onClick={this.props.playing} 
               

                className={this.props.playButton}
                aria-hidden="true"></i>
                <span> Title</span>   
                
                </div>     

                <div className="video-duration">
                    <span>4.29</span>    
                </div> 

            </div> 
            );
        }


}

export default VideoList;

