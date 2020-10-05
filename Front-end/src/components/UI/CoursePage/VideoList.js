import React, {Component} from 'react';
import './CSS/VideoList.css';

class VideoList extends Component{

    state={
        playing:false,
    }

    playing=()=>{
        this.setState({playing:!this.state.playing})
    }
    
    render(){



            return(
            <div className="video-list">
                
                <div className="play-title">
                
                <i onClick={this.props.playing} onClick={this.playing} 
                class="fa fa-play" 
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

