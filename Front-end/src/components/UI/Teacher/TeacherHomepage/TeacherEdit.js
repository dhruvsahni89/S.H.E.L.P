import React,{Component} from 'react';
//import Aux from '../../../hoc/ReactFrag';
//import Scroll from 'react-scroll';
import Tinput from '../TinputFields';
import TeacherTittle from '../TeacherTittle';
import {Link,Redirect} from 'react-router-dom';
import Cloud from '../../../../assets/Images/cloud.png';
import '../CSS/Teacher.css';
import axios from '../../../../ApiServices/axiosUrl';
import AuthServices from '../../../../ApiServices/auth.service';
import Alert from '../../../../Auth/Forms/alert';
import ProgressBar from 'react-bootstrap/ProgressBar'
import CKEditorArea from '../CKEditor';



class TeacherPage extends Component{


    state = { 

        CourseDetails:null,
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
                label: "Short Description",
                rows: "4",
                cols: "50",
                placeholder: 'eg: Complete HTML5, CSS3, Basics of Js',
                value: "",
                valid:false,
                validation: {
                    required: true,
                    
                },
               
            },
            
            discriptionLong: {
                 label: "Long Description",
                 rows: "6",
                 cols: "50",
                 placeholder: 'Entereg: In this course you will learn how to build professional website from scratch and how to make it responsive. Course Title',
                 value: "",
                 valid:true,

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
                "Web Development":false,
                "React" : false,
                "ML": false,
                "Web Designing": false,
                "NodeJs":false,
                "Photography":false,

                
            
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

            willLearn:{
                label: "What will the students learn from this?",
                rows: "5",
                cols: "70",
                placeholder: 'students will learnt to apply react skills...',
                value: "",
                validation: {
                    required: true,
                    minLength:1,
                    
                },
                 valid:false,
            },

            requirement:{
                label: "What are the requirements of this course?",
                rows: "5",
                cols: "70",
                placeholder: 'Must know python etc ',
                value: "",
                validation: {
                    required: true,
                    minLength:1,
                    
                },
                 valid:false,
            },

            
     
    },
     
    alert: {
        valid:false,
        msg:"",
        alertType:" ",
        
    },
    CourseNames:["Web Development","React", "ML","Web Designing","NodeJs",
                "Photography"],
    isLoggedIn:false,
    userName:"",
    alertPressed:false,
    redirect:null,
    uploadedPercentage:0,
    loading:true,
}

    componentDidMount(){
        let userToken = AuthServices.getCurrentUser();
        let userName= AuthServices.getUserName();
        if(userToken!==null){
            this.setState({isLoggedIn:true,userName:userName});
        }

        const fd = new FormData();
        console.log(this.props.location.aboutProps.CourseId)
        fd.append('courseId',this.props.location.aboutProps.CourseId);

        axios.put("/home/edit",fd,{
            headers: {
                Authorization: 'Bearer '+ localStorage.getItem('user') 
            }
        } )
        .then(response => {
            console.log("Edit details",response);

            this.setState({CourseDetails:response.data});
            this.setState({loading:false})
            alert("Course Edit details,please refresh");
            

        })
        .catch(error => {
            console.log(error);
        })

        
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

    CKEditorHandler  =(event,editor,Title)=> {

        const data =editor.getData();
        const updatedForm = {
            ...this.state.Form
        }
        updatedForm[Title].value=data;
        updatedForm[Title].valid=this.checkValidity(data, updatedForm[Title].validation)
        this.setState({Form:updatedForm})

    }


    inputchangeHandler = (event,inputIdentifier)=> {

        const updatedForm = {
            ...this.state.CourseDetails
        }
       
        

        updatedForm[inputIdentifier] = event.target.value;


       

        //updatedElement.valid = this.checkValidity(updatedElement.value,
          //  updatedElement.validation);


        this.setState({CourseDetails: updatedForm});
        console.log(this.state.CourseDetails)
    }

    categoryHandler = (CourseName)=>{

        const Coursecategory = {...this.state.Form};

        Coursecategory.category.value = CourseName;

        for(let x in this.state.CourseNames){

            if(this.state.CourseNames[x]!==CourseName){
                Coursecategory.category[this.state.CourseNames[x]]=false;
               // console.log(this.state.CourseNames[x])
            }
        }

        Coursecategory.category[CourseName]=true;
        
        this.setState({Form:Coursecategory});
      
        
       
    }



    fileSelectorHandler = event =>{
    
        const selectedfile= {...this.state.Form};

        selectedfile.file.value= event.target.files;
       
        this.setState({Form:selectedfile })
        console.log(selectedfile)

     
        
       
    }


    


    sumbitButton =()=> {
        
        this.setState({alertPressed:true})
        setTimeout( ()=> this.setState({alertPressed:false}) , 2000);
        const form={};
        const fd = new FormData();

      
        for(let formElement in this.state.Form){
                
                
            if(!(formElement === 'file')){
               
                fd.append(formElement, this.state.Form[formElement].value);
            }
            else{
                for(var i =0;i<this.state.Form['file'].value.length; i++){
                    
                    fd.append(formElement,this.state.Form['file'].value[i])
                }
            }
                form[formElement]=this.state.Form[formElement].value;

                
        }


       

        if(this.OverallValidity()){

        
                    
                axios.post('creator/create-course',fd,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Access-Control-Allow-Origin": '*',
                        Authorization: 'Bearer '+ localStorage.getItem('user') 
                    }
                }, {
                    onUploadProgress: progressEvent => {
                        console.log("mmmmmm");
                        const {loaded,total} =progressEvent;
                        let percent =Math.floor((loaded*100)/total);
                        console.log("percent" + percent)
                        if(percent<100){
                            this.setState({uploadedPercentage:percent})
                        }
                    }
                })
                .then( res=> { console.log(res);

                    if(res.status ===201 || res.status ===200){

                    this.AlertError("Your Course has been saved!", "success");
                
                }})


            

                .catch(error => { console.log(error.response)
                    this.AlertError(error.response.data.message, "danger");
                    if(error.response.data.message ==="jwt malformed" )
                        this.setState({redirect:"/login"})
                });
        
        }
        else
            this.AlertError("Validation Errors!", "warning");
       
    }
 
    

    render(){

        let title = null;
        if(!this.state.loading){
            title=this.state.CourseDetails.title;
        }

        
        let classWeb=[];
        let classWebDesign=[];
        let classReact=[];
        let classML=[];
        let classNodeJs=[];
        let classPhotography=[];


        let Welcome = null;
        let alertContent = null;
        let fileName=null;
       
        if(this.state.redirect){
            return <Redirect to="/login"/>
        }
        

        if(this.state.Form.category['Web Development']){
            classWeb=['ButtonClicked']
            //console.log("clicked11",classWeb.join(' '),this.state.Form.category['Web Development'])
        }
        else classWeb=[];

         if(this.state.Form.category['Web Designing']){
            classWebDesign=['ButtonClicked']
            
        }
        else classWebDesign=[];
    
        if(this.state.Form.category['ML']){
            classML=['ButtonClicked']
        }
        else classML=[];


         if(this.state.Form.category['React']){
            classReact=['ButtonClicked']
        }
        else classReact=[];

         if(this.state.Form.category['Photography']){
            classPhotography=['ButtonClicked']
        }
        else classPhotography=[];


        if(this.state.Form.category['NodeJs']){
            classNodeJs=['ButtonClicked']
        }
        else classNodeJs=[];

       

        const uploadedPercentage = this.state.uploadedPercentage;

        
        
        if(this.state.Form.file.value){
             fileName=this.state.Form.file.value[1].name;
             
        }

      
        

        if(this.state.alert.valid){
            alertContent = ( <Alert alertMsg ={this.state.alert.msg} 
                                    alertType={this.state.alert.alertType} 
                                    value={this.state.alertPressed}/> )
        }
        
        if(this.state.isLoggedIn) {
            Welcome = <p> Edit your Course </p>;
        }
        
     //   if(this.state.Form)
      

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
                value={title}
                changed={(event)=> this.inputchangeHandler(event,"name")}
                />


        </div>


          
        <div className="Teacher-Head-Class">
        
            
            <Tinput
            label={this.state.Form.title.label}
            rows={this.state.Form.title.rows}
            cols={this.state.Form.title.cols}
            value={title}
            changed={(event)=> this.inputchangeHandler(event,"title")}
            />


        </div>

     <div className="Teacher-Courses-Buttons-head">

            <p className="CourseCategoryTitle">Course Category</p>

            <div className="Teacher-Courses-Buttons">

                <button onClick={()=> this.categoryHandler("Web Development")} className={classWeb.join(' ')} > Development</button>
                <button className={classWebDesign.join(' ')} onClick={()=> this.categoryHandler("Web Designing")}> Designing</button>
                <button className={classReact.join(' ')} onClick={()=> this.categoryHandler("React")}> React</button>
                <button className={classML.join(' ')} onClick={()=> this.categoryHandler("ML")}> ML</button>
                <button className={classPhotography.join(' ')} onClick={()=> this.categoryHandler("Photography")}> Photography</button>
                <button className={classNodeJs.join(' ')} onClick={()=> this.categoryHandler("NodeJs")}> Node JS</button>
                
            </div>

        </div>    


  

   
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

        <div id="section2" className="Teacher-Head-Class">
            <CKEditorArea
            label={this.state.Form.discriptionLong.label}
            rows={this.state.Form.discriptionLong.rows}
            cols={this.state.Form.discriptionLong.cols}
            placeholder={this.state.Form.discriptionLong.placeholder}
            changed={(event,editor)=> this.CKEditorHandler(event,editor,"discriptionLong")}
            
            
           // changed={(event)=> this.inputchangeHandler(event,"discriptionLong")}
            />

        </div>


        <div  className="Teacher-Head-Class">

        <CKEditorArea
            label={this.state.Form.willLearn.label}
            rows={this.state.Form.willLearn.rows}
            cols={this.state.Form.willLearn.cols}
            placeholder={this.state.Form.willLearn.placeholder}
            changed={(event,editor)=> this.CKEditorHandler(event,editor,"willLearn")}
            
            
           // changed={(event)=> this.inputchangeHandler(event,"discriptionLong")}
            />
        
        </div>

        <div  className="Teacher-Head-Class">

        <CKEditorArea
            label={this.state.Form.requirement.label}
            rows={this.state.Form.requirement.rows}
            cols={this.state.Form.requirement.cols}
            placeholder={this.state.Form.requirement.placeholder}
            changed={(event,editor)=> this.CKEditorHandler(event,editor,"requirement")}
            
            
           // changed={(event)=> this.inputchangeHandler(event,"discriptionLong")}
            />
        
        </div>
        
         {/* <button className="NextBtn">Next</button>  */}



        <div className="Teacher-Head-Class">
            <img src={Cloud} alt="cloud"/>
            <p className="cloudpng">Upload your content</p>
        </div>


            <div className="Teacher-Head-Class">
            
            
                <label className="custom-image-upload">
                    <input type="file" name='file' multiple onChange={this.fileSelectorHandler}/>
                    Upload Image
            </label>

            <p className="ImageName">{fileName}</p>
            <img className="" 
                src={"http://localhost:8080/" + fileName} alt="banner1"/>

            
            </div>

        
            <div className="Welcome-msg">
                <button onClick={this.sumbitButton} >Sumbit </button>
            </div>

          <div>
              {uploadedPercentage>0 ? <ProgressBar now={uploadedPercentage}
                    label={`${uploadedPercentage}%`}/> :null }
          </div> 
            

          
        </div>

        


        );
    }
}

export default TeacherPage;