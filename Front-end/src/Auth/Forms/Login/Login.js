import React, {Component} from 'react';
import AuthService from "../../../ApiServices/auth.service";
import '../Form.css';
import { Redirect } from 'react-router-dom';
import Input from '../../../components/UI/Input/FormInput';
import SpinnerButton from '../../../components/UI/Spinners/SpinnerButton';
import MainPage from '../../../components/UI/MainPage/MainPage';
//import axios from '../../../ApiServices/axiosUrl';
import Google_logo from '../../../components/UI/Logo/google';
import SumbitButton from '../../../components/UI/Buttons/SumbitButton';
import Alert from '../alert';

class Login extends Component {

    state = { 
        Form:{
            
            email: {

                placeholder: 'Email',
                value: "",
                valid: false,
                type: 'email',
                error: " ",
                msg: '',

                validation: {
                    required: true,
                    regex:/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
                   
                },
                touched: false,
            
        },

            password: {

                placeholder: 'Password',
                value: "",
                valid: false,
                type: 'password',
                error: " ",
                msg: '',

                validation: {
                    required: true,
                    minLength:5,
                    maxLength:18
                },
                touched: false,
            
        },

    },
    loading:false,
      
    alert: {
        valid:false,
        msg:"",
        alertType:"",
    }
    
   
     
}


AlertError(alertmsg, alertType) {
    const AlertArray = {...this.state.alert};
    AlertArray.msg = alertmsg;
    AlertArray.valid=true;
    AlertArray.alertType=alertType;
    this.setState({alert:AlertArray});

}


checkValidity(value,rules){
    let isValid = true;
    const regex = rules.regex;
    if(rules.required){
        isValid =value.trim()!=='' && isValid;
    }

    if(rules.minLength){
        isValid = value.length >= rules.minLength  && isValid;
    }
 
    
    if(rules.maxLength){
        isValid = value.length <= rules.maxLength  && isValid;
    }

    if(rules.regex){
        isValid = regex.test(value) && isValid;
    }

    return isValid;
    
 }


//   runs whenever there is any change in the input field
inputchangeHandler = (event,inputIdentifier)=> {
    const updatedForm = {
        ...this.state.Form
    }
    const updatedElement = {...updatedForm[inputIdentifier]}
    

    updatedElement.value = event.target.value;

    if(updatedElement.value.length>0) 
        updatedElement.touched=true;

    else {updatedElement.touched=false;
          updatedElement.error="";  
    }
    
    updatedElement.valid = this.checkValidity(updatedElement.value,
        updatedElement.validation);
        
    // msg error for password
    if(inputIdentifier === "password" && !updatedElement.valid){
        updatedElement.error = "At least 5 characters and at most 18";
        updatedElement.msg="";
    }
    if(inputIdentifier === "password" && updatedElement.valid){
        updatedElement.error="";
        updatedElement.msg="All good!";
    }
    // msg errors for email
    if(inputIdentifier === "email" && !updatedElement.valid){
        updatedElement.error = "check format";
        updatedElement.msg="";
    }
    if(inputIdentifier === "email" && updatedElement.valid){
        updatedElement.error="";
        updatedElement.msg="All good!";
    }

    


    updatedForm[inputIdentifier] = updatedElement;
    this.setState({Form: updatedForm});

}

OverallValidity = ()=>{

    for(let validate in this.state.Form){
        if(!this.state.Form[validate].valid){
            return false;
        }
    }
    return true;
}


formHandler = (event)=> {
    event.preventDefault();

     if(this.OverallValidity()){

        this.setState({loading:true});
        const formData ={};
        for(let formElement in this.state.Form){
                formData[formElement]=this.state.Form[formElement].value;
        }
        
        AuthService.login(formData)
        .then(response => {
          
            console.log('Response:', response)
            if(response.status ===201 || response.status ===200)

                {
                
                alert(response.data.message);
                localStorage.setItem('user',response.data.token);
                localStorage.setItem('userId',response.data.userId);
                localStorage.setItem('userName',response.data.username);
                this.setState({loading:false})
                this.setState({redirect:'/HomePage'})
                console.log(response.data)
               // window.location.reload();
           
            }
            else 
                alert("Something went wrong")})

        .catch(error=>{console.log(error); 
            this.setState({loading:false});
            this.AlertError("Make sure the Validations are correct", "danger");});
  
        }
        
        else this.AlertError("Make sure the Validations are correct", "warning");
    }


   


render() {

 
    let alertContent = null;


    if(this.state.alert.valid){
        alertContent = ( <Alert alertMsg ={this.state.alert.msg} alertType={this.state.alert.alertType} /> )
    }

   
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }

    const formElementsArray =[];
    for(let key in this.state.Form ){
        formElementsArray.push({
            id:key,
            config:this.state.Form[key]
        });

    };

    let LoginSumbitButton= <SumbitButton className={"Sumbit-btn"} Label={"Login"}/>;
   
    if(this.state.loading){
        LoginSumbitButton= <SpinnerButton spinnerclass={"Sumbit-btn"}/>;
    }

    let form = (
      <div className="login-form">
          <button className="google-btn"> <Google_logo/>  Continue using google</button>
          <p className="devider-or">OR</p>
        <form onSubmit={this.formHandler} >
        
            {
                formElementsArray.map(x=> (

                  <Input 
                    key={x.id}
                    placeholder={x.config.placeholder}
                    value={x.config.value}
                    type={x.config.type}
                    invalid={!x.config.valid}
                    touched={x.config.touched}
                    errors={x.config.error}
                    msg={x.config.msg}
                    changed={(event)=> this.inputchangeHandler(event,x.id)}/>

                ))
            }
            <p className="forgot-password"  onClick={this.logout}> logout</p>
            {LoginSumbitButton}
            <p className="account-login"> New User? <a href="/">Sign up</a></p>
         

               
        </form> 
        </div>
    );
        


        return (<div>
                    {alertContent}
                    <div className="SideContent">
                        
                        <MainPage
                        shelp={true}
                        heading1={"Resume your"}
                        heading2={"learning with"}/>

                            {form}
                    </div>
            </div>
        );
    }
  
}

export default Login;