import React, {Component} from 'react';
import Categories from './Categories';
import HomeBanner from './HomeBanner';
import CourseCards from './CourseCards';
import CourseTitle from './CourseTitle';
//import ProductApi from './../../../ApiServices/ProductApi';
import axios from "../../../ApiServices/axiosUrl";
import Recommendation from './Recommendation';
import './CSS/Homepage.css';



class Homepage extends Component {

    state = {

        Courses: null,
        loading: true,
    }


    componentDidMount(){
        axios.get('/posts')
        .then(response => {
            console.log("Courses ka response ye",response);
       
            this.setState({Courses: response.data.posts});
            console.log('courses state chaged, courses fetched')
            this.setState({loading:false});
            console.log(this.state);

        })
        .catch(error => {
            console.log(error);
        })
        console.log(this.state);
    }

    
    


    render(){

        let data = (<p>Loading...</p>);

        if(!this.state.loading){
           
            let CourseArray= this.state.Courses.slice(0,8);

            data = (
              CourseArray.map(item =>  
              
              <CourseCards   
                key={item.id}
                title={item.title}
                teacher={item.name}
                />)
    
            );
            


            };

        
        
    
    
        
        return(

            <div className="container">

                <HomeBanner/>

                <div className="mt-5 Course-Content"> 
                    <Categories/>
                    <div className="Course-Content-col">
                   
                                <CourseTitle/>

                                <div className="Course-Content-wrap">
                                    {data}
                                </div>


                                <Recommendation/>

                    </div>

                </div>



            </div>
        );
    }

}

export default Homepage;