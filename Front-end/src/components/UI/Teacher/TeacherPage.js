import React,{Component} from 'react';
//import Aux from '../../../hoc/ReactFrag';
import Tinput from './TinputFields';
import TeacherTittle from './TeacherTittle';
import {Link} from 'react-router-dom';
import Cloud from '../../../assets/Images/cloud.png';
import './CSS/Teacher.css';



class TeacherPage extends Component{


    state = { 
        Form:{
             Title: {
                label: "Title",
                rows: "1",
                cols: "50",
                placeholder: 'Enter Course Title',
                value: "",
                //valid: false,
                //type: 'text',
                //error: " ",
                
                touched: false,
            },
            Learning: {
                label: "What will Students learn from your course",
                rows: "4",
                cols: "50",
                placeholder: 'eg: Complete HTML5, CSS3, Basics of Js',
                value: "",
                //valid: false,
                //type: 'text',
                //error: " ",
                
                touched: false,
            },
            Description: {
                label: "Description of your course",
                rows: "6",
                cols: "50",
                placeholder: 'Entereg: In this course you will learn how to build professional website from scratch and how to make it responsive. Course Title',
                value: "",
                //valid: false,
                //type: 'text',
                //error: " ",
                
                touched: false,
            },

            Category: {
                value: "",
            
            }
            
    },
    
}


    inputchangeHandler = (event,inputIdentifier)=> {

        const updatedForm = {
            ...this.state.Form
        }
        const updatedElement = {...updatedForm[inputIdentifier]}
        

        updatedElement.value = event.target.value;


        updatedForm[inputIdentifier] = updatedElement;
        this.setState({Form: updatedForm});

    }

    CategoryHandler = (event, CourseName)=>{
        const CourseCategory = {...this.state.Form};
        // const CourseElement = {...CourseCategory.Category};

        // console.log((CourseElement))
        
        // CourseElement.value = CourseName;

        CourseCategory.Category.value = CourseName;
        
        
        this.setState({Form:CourseCategory});
        
        
      
       
        
    }




    render(){
        
        console.log(this.state.Form)

        return(

        <div className="container-fluid-main">
          
        <div className="Teacher-Head-Class">
        
            
            <Tinput
            label={this.state.Form.Title.label}
            rows={this.state.Form.Title.rows}
            cols={this.state.Form.Title.cols}
            placeholder={this.state.Form.Title.placeholder}
            changed={(event)=> this.inputchangeHandler(event,"Title")}
            />


        </div>

     <div className="Teacher-Courses-Buttons-head">

            <p className="CourseCategoryTitle">Course Category</p>

            <div className="Teacher-Courses-Buttons">
                <button onClick={(event)=> this.CategoryHandler(event,"Web Development")}> Development</button>
                <button onClick={(event)=> this.CategoryHandler(event,"Web Desginign")}> Designing</button>
                <button onClick={()=> this.CategoryHandler("React")}> React</button>
                <button onClick={()=> this.CategoryHandler("ML")}> ML</button>
                <button onClick={()=> this.CategoryHandler("Photography")}> Photography</button>
                <button onClick={()=> this.CategoryHandler("NodeJs")}> Node JS</button>
                
            </div>

        </div>    


            <Link to="#section2"><button className="NextBtn">Next</button></Link>


            <TeacherTittle TitleDesc={"Description of your Course"}/>
            
        <div className="Teacher-Head-Class">
            <Tinput
            label={this.state.Form.Learning.label}
            rows={this.state.Form.Learning.rows}
            cols={this.state.Form.Learning.cols}
            placeholder={this.state.Form.Learning.placeholder}
            changed={(event)=> this.inputchangeHandler(event,"Learning")}
            />

        </div>

        <div  className="Teacher-Head-Class">

                <Tinput
                    label={this.state.Form.Description.label}
                    rows={this.state.Form.Description.rows}
                    cols={this.state.Form.Description.cols}
                    placeholder={this.state.Form.Description.placeholder}
                   
                    changed={(event)=> this.inputchangeHandler(event,"Description")}/>
        
        </div>
        
        <button className="NextBtn">Next</button>



        <div className="Teacher-Head-Class">
            <img src={Cloud} alt="cloud"/>
            <p className="cloudpng">Upload your content</p>
        </div>


        <div className="Teacher-Head-Class">
           <button>Choose File</button>
           <button>Choose Video</button>
        </div>
        
          
        </div>


        );
    }
}

export default TeacherPage;