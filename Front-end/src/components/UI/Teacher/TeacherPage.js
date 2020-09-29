import React,{Component} from 'react';
//import Aux from '../../../hoc/ReactFrag';
import Tinput from './TinputFields';
import TeacherTittle from './TeacherTittle';
import {Link} from 'react-router-dom';
import Cloud from '../../../assets/Images/cloud.png';
import './CSS/Teacher.css';
import axios from '../../../ApiServices/axiosUrl';
import AuthServices from '../../../ApiServices/auth.service';


class TeacherPage extends Component{


    state = { 
        Form:{
             title: {
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
            discription: {
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

            category: {
                value: "",
            
            },

            file:{
                value:'',
            },

            name:{
                label: "Enter your Name",
                rows: "1",
                cols: "50",
                placeholder: 'Your Name',
                value: "",
                touched: false,
            },

            _id: {
                value: localStorage.getItem('userId'),
            },

        

            
            
    },

    isLoggedIn:false,
    userName:"",
    
}

    componentDidMount(){
        let userToken = AuthServices.getCurrentUser();
        let userName= AuthServices.getUserName();
        if(userToken!==null){
            this.setState({isLoggedIn:true,userName:userName});
        }
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

    categoryHandler = (event, CourseName)=>{
        const Coursecategory = {...this.state.Form};
        // const CourseElement = {...Coursecategory.category};

        // console.log((CourseElement))
        
        // CourseElement.value = CourseName;

        Coursecategory.category.value = CourseName;
        
        
        this.setState({Form:Coursecategory});
        
       
    }

    fileSelectorHandler = event =>{
    
        const selectedfile= {...this.state.Form};

        selectedfile.file.value = event.target.files[0];
       
        this.setState({Form:selectedfile })

    }

    sumbitButton =()=> {
        const formData ={};
        const fd = new FormData();

        
        for(let formElement in this.state.Form){
                formData[formElement]=this.state.Form[formElement].value;
                fd.append(formElement,this.state.Form[formElement].value);
        }



        axios.post('creator/create-course',fd, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": '*',
            }
        }).
        then( res=> { console.log(res)})

       

        .catch(error => { console.log(error)});
        
        console.log(formData);
    }


    render(){
        
        let Welcome = null;

        if(this.state.isLoggedIn) {
            Welcome = <p > Welcome {this.state.userName}!</p>;
        }
          
      

        return(

          

        <div className="container-fluid-main">

            <div className="Welcome-msg">
                
                    {Welcome}

            </div>

          
        <div className="Teacher-Head-Class">
        
            
            <Tinput
            label={this.state.Form.title.label}
            rows={this.state.Form.title.rows}
            cols={this.state.Form.title.cols}
            placeholder={this.state.Form.title.placeholder}
            changed={(event)=> this.inputchangeHandler(event,"title")}
            />


        </div>

     <div className="Teacher-Courses-Buttons-head">

            <p className="CourseCategoryTitle">Course Category</p>

            <div className="Teacher-Courses-Buttons">
                <button onClick={()=> this.categoryHandler("Web Development")}> Development</button>
                <button onClick={()=> this.categoryHandler("Web Desginign")}> Designing</button>
                <button onClick={()=> this.categoryHandler("React")}> React</button>
                <button onClick={()=> this.categoryHandler("ML")}> ML</button>
                <button onClick={()=> this.categoryHandler("Photography")}> Photography</button>
                <button onClick={()=> this.categoryHandler("NodeJs")}> Node JS</button>
                
            </div>

        </div>    


            <Link to="#section2"><button className="NextBtn">Next</button></Link>


            <TeacherTittle TitleDesc={"Description of your Course"}/>
            
        <div className="Teacher-Head-Class">
            <Tinput
            label={this.state.Form.discription.label}
            rows={this.state.Form.discription.rows}
            cols={this.state.Form.discription.cols}
            placeholder={this.state.Form.discription.placeholder}
            changed={(event)=> this.inputchangeHandler(event,"discription")}
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
           
           
           <label className="custom-image-upload">
                    <input type="file" name='file' key="file" onChange={this.fileSelectorHandler}/>
                    Upload Video
           </label>

            <label className="custom-image-upload">
                <input type="file" name='file' key="file" onChange={this.fileSelectorHandler}/>
                Upload Image
           </label>
        
        </div>

        <div className="Welcome-msg">
            <button onClick={this.sumbitButton} >Sumbit </button>
        </div>
          
        </div>

        


        );
    }
}

export default TeacherPage;