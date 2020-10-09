import React, {Component} from 'react';
import './CSS/VideoList.css';

class VideoList extends Component{

 
    
    render(){
        let className=[];

        if(this.props.playButton){
            className=['video-list',this.props.playButton];
        }
      

            return(
            <div onClick={this.props.changed}  className={className.join(' ')}>
                
                <div className="play-title">
                
                <i 
               
                className="fa fa-pause-circle"
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

