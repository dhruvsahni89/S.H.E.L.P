import React,{Component} from 'react';
//import Aux from '../../../hoc/ReactFrag';
import Tinput from './TinputFields';
import TeacherTittle from './TeacherTittle';
import {Link} from 'react-router-dom';
import Cloud from '../../../assets/Images/cloud.png';
import './CSS/Teacher.css';
import axios from '../../../ApiServices/axiosUrl';
import AuthServices from '../../../ApiServices/auth.service';
import Alert from '../../../Auth/Forms/alert';

class TeacherPage extends Component{


    state = { 
        Form:{

             title: {
                label: "Title",
                rows: "1",
                cols: "50",
                placeholder: 'Enter Course Title',
                value: "",
                valid:false,
                validation: {
                    required: true,
                    minLength:0,
                    
                },
                
          
            },
            discription: {
                label: "What will Students learn from your course",
                rows: "4",
                cols: "50",
                placeholder: 'eg: Complete HTML5, CSS3, Basics of Js',
                value: "",
                valid:false,
                validation: {
                    required: true,
                    
                },
               
            },
            
            Description: {
                 label: "Description of your course",
                 rows: "6",
                 cols: "50",
                 placeholder: 'Entereg: In this course you will learn how to build professional website from scratch and how to make it responsive. Course Title',
                 value: "",
                 valid:false,

                 validation: {
                    required: true,
                   
                },
                 
               
             },

            category: {
                value: "",
                valid:true,
                validation: {
                    required: true,
                  
                },
                
            
            },

            file:{
                value:'',
                validation: {
                    required: true,
                    
                },
                valid:true,

            },

            name:{
                label: "Enter your Name",
                rows: "1",
                cols: "50",
                placeholder: 'Your Name',
                value: "",
                validation: {
                    required: true,
                    minLength:1,
                    
                },
                 valid:false,
            },

            _id: {
                value: localStorage.getItem('userId'),
                valid:true,
            },
     
    },
     
    alert: {
        valid:false,
        msg:"",
        alertType:" ",
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

    checkValidity(value,rules){
        let isValid = true;
      

        if(rules.required){
            isValid =value.trim()!=='' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength  && isValid;
        }
     
        
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength  && isValid;
        }

       

        return isValid;
        
     }

     OverallValidity = ()=>{

        for(let validate in this.state.Form){
           
            console.log(validate, this.state.Form[validate].valid);
            if(!this.state.Form[validate].valid){
                return false;
            }
         
        }
        return true;
    }
    
    
    AlertError(alertmsg, alertType) {
        const AlertArray = {...this.state.alert};
        AlertArray.msg = alertmsg;
        AlertArray.valid=true;
        AlertArray.alertType=alertType;
        this.setState({alert:AlertArray});

    }


    inputchangeHandler = (event,inputIdentifier)=> {

        const updatedForm = {
            ...this.state.Form
        }
        const updatedElement = {...updatedForm[inputIdentifier]}
        

        updatedElement.value = event.target.value;


        updatedForm[inputIdentifier] = updatedElement;

        updatedElement.valid = this.checkValidity(updatedElement.value,
            updatedElement.validation);


        this.setState({Form: updatedForm});

    }

    categoryHandler = (CourseName)=>{
        const Coursecategory = {...this.state.Form};
        // const CourseElement = {...Coursecategory.category};

        // console.log((CourseElement))
        
        // CourseElement.value = CourseName;

        Coursecategory.category.value = CourseName;
        
        
        this.setState({Form:Coursecategory});
        alert(this.state.Form.category.value)
        
       
    }

    fileSelectorHandler = event =>{
    
        const selectedfile= {...this.state.Form};

        selectedfile.file.value= event.target.files;
       
        this.setState({Form:selectedfile })
        console.log(this.state.Form.file);
        console.log('length',this.state.Form['file'].value.length);
        console.log('event=>', event.target.files);
    }

    sumbitButton =()=> {
        
        var touched=true;
        const form={};
        const fd = new FormData();

        
        for(let formElement in this.state.Form){
                console.log('top for++>',formElement)
                
            if(!(formElement === 'file')){
                console.log('niche walal'+ "=pussy")
                fd.append(formElement, this.state.Form[formElement].value);
            }
            else{
                for(var i =0;i<this.state.Form['file'].value.length; i++){
                    console.log(this.state.Form['file'].value[i])
                    fd.append(formElement,this.state.Form['file'].value[i])
                }
            }
                form[formElement]=this.state.Form[formElement].value;

                
        }


       

        if(this.OverallValidity()){
                    
                axios.post('creator/create-course',fd, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Access-Control-Allow-Origin": '*',
                    }
                }).
                then( res=> { console.log(res);

                    if(res.status ===201 || res.status ===200){

                    this.AlertError("Your Course has been saved!", "success");
                }})


            

                .catch(error => { console.log(error)});
        
        }
        else
            this.AlertError("Validation Errors!", "warning");
       
    }
 
    

    render(){
        
        let Welcome = null;
        let alertContent = null;
        let value=0;
        var touched;
        
        console.log(this.state.Form);
        

        if(this.state.alert.valid){
            alertContent = ( <Alert alertMsg ={this.state.alert.msg} 
                                    alertType={this.state.alert.alertType} 
                                    value={touched}/> )
        }
        
        if(this.state.isLoggedIn) {
            Welcome = <p > Welcome {this.state.userName}!</p>;
        }
          
      

        return(

          

        <div className="container-fluid-main">

            {alertContent}

            <div className="Welcome-msg">
                
                    {Welcome}

            </div>

        
        <div className="Teacher-Head-Class">
        
                    
                <Tinput
                label={this.state.Form.name.label}
                rows={this.state.Form.name.rows}
                cols={this.state.Form.name.cols}
                placeholder={this.state.Form.name.placeholder}
                changed={(event)=> this.inputchangeHandler(event,"name")}
                />


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
                <button onClick={()=> this.categoryHandler("Web Designing")}> Designing</button>
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
           
           
           {/* <label className="custom-image-upload">
                    <input type="file" name='filel' onChange={this.fileSelectorHandler}/>
                    Upload Video
           </label> */}

            <label className="custom-image-upload">
                <input type="file" name='file' multiple onChange={this.fileSelectorHandler}/>
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