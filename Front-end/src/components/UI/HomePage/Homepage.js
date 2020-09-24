import React, {Component} from 'react';
import Categories from './Categories';
import HomeBanner from './HomeBanner';
import CourseCards from './CourseCards';
// import Recommendation from './Recommendation';
import './CSS/Homepage.css';



class Homepage extends Component {

    render(){
        return(
            <div className="container">
                <HomeBanner/>

                <div className="mt-5 Course-Content">
                    <Categories/>
                    <CourseCards/>
                </div>


            </div>
        );
    }

}

export default Homepage;