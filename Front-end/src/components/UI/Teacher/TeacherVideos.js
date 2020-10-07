import React,{Component} from 'react';
//import Aux from '../../../hoc/ReactFrag';
//import Scroll from 'react-scroll';
//import Tinput from './TinputFields';
//import TeacherTittle from './TeacherTittle';
import {Link,Redirect} from 'react-router-dom';
import Cloud from '../../../assets/Images/cloud.png';
import './CSS/Teacher.css';
import axios from '../../../ApiServices/axiosUrl';
import AuthServices from '../../../ApiServices/auth.service';
//import Alert from '../../../Auth/Forms/alert';
//import ProgressBar from 'react-bootstrap/ProgressBar'




class TeacherPage extends Component{


    state = { 
        Form:{

          
            file:{
                value:[],
                validation: {
                    required: true,
                    
                },
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
    alertPressed:false,
    redirect:null,
    uploadedPercentage:0,
    
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

    




    fileSelectorHandler = event =>{
    
        const selectedfile= {...this.state.Form};

        selectedfile.file.value.push( event.target.files[0]);
       
        this.setState({Form:selectedfile })
        console.log(selectedfile)

     
        
       
    }


    


    sumbitButton =()=> {
        
        this.setState({alertPressed:true})
        setTimeout( ()=> this.setState({alertPressed:false}) , 2000);
        const form={};
        const fd = new FormData();
       
        for(let i=0;i<this.state.Form['file'].value.length;i++){
            fd.append('file',this.state.Form['file'].value[i])
               
        }
    
    

      

       

        if(this.OverallValidity()){

        
                    
                axios.post(`/creator/videoUpload/${this.props.location.state.CourseId}`,fd,{
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

console.log(this.props.location.state.CourseId)
        let fileName=null;
        let alertContent=null;
        let Welcome=null;
        
        if(this.state.redirect){
            return <Redirect to="/login"/>
        }
       
       
        
        if(this.state.Form.file.value[0]){
            fileName=this.state.Form.file.value[0].name;
            
       }

      
        

        // if(this.state.alert.valid){
        //     alertContent = ( <Alert alertMsg ={this.state.alert.msg} 
        //                             alertType={this.state.alert.alertType} 
        //                             value={this.state.alertPressed}/> )
        // }
        
        if(this.state.isLoggedIn) {
            Welcome = <p > Upload 5 Videos</p>;
        }
          
      

        return(

          

        <div className="container-fluid-main">

                 {alertContent}

            <div className="Welcome-msg">
                
                    {Welcome}

            </div>


        <div className="Teacher-Head-Class">
            <img src={Cloud} alt="cloud"/>
            <p className="cloudpng">Upload your content</p>
        </div>


            <div className="Teacher-Head-Class">
            
            
                <label className="custom-image-upload">
                    <input type="file" name='file'  onChange={this.fileSelectorHandler}/>
                    Upload Video1
                </label>

            <p className="ImageName">{fileName}</p>
            <img className="" 
                src={"http://localhost:8080/" + fileName} alt="banner1"/>

            
            </div>



            <div className="Teacher-Head-Class">
            
            
                <label className="custom-image-upload">
                    <input type="file" name='file' onChange={this.fileSelectorHandler}/>
                    Upload Video2
            </label>

            <p className="ImageName">{fileName}</p>
            <img className="" 
                src={"http://localhost:8080/" + fileName} alt="banner1"/>

            
            </div>



            <div className="Teacher-Head-Class">
            
            
                <label className="custom-image-upload">
                    <input type="file" name='file' onChange={this.fileSelectorHandler}/>
                    Upload Video3
            </label>

            <p className="ImageName">{fileName}</p>
            <img className="" 
                src={"http://localhost:8080/" + fileName} alt="banner1"/>

            
            </div>



            <div className="Teacher-Head-Class">
            
            
                <label className="custom-image-upload">
                    <input type="file" name='file' onChange={this.fileSelectorHandler}/>
                    Upload Video4
            </label>

            <p className="ImageName">{fileName}</p>
            <img className="" 
                src={"http://localhost:8080/" + fileName} alt="banner1"/>

            
            </div>



            <div className="Teacher-Head-Class">
            
            
                <label className="custom-image-upload">
                    <input type="file" name='file'  onChange={this.fileSelectorHandler}/>
                    Upload Video5
            </label>

            <p className="ImageName">{fileName}</p>
            <img className="" 
                src={"http://localhost:8080/" + fileName} alt="banner1"/>

            
            </div>
            

        
            <div className="Welcome-msg">
                <button onClick={this.sumbitButton} >Sumbit </button>
            </div>




          {/* <div>
              {uploadedPercentage>0 ? <ProgressBar now={uploadedPercentage}
                    label={`${uploadedPercentage}%`}/> :null }
          </div>  */}
            

          
        </div>

        


        );
    }
}

export default TeacherPage;