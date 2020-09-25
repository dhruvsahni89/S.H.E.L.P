import React, {Component} from 'react';
import '../Form.css';
import Input from '../../../components/UI/Input/Input';
import MainPage from '../../../components/UI/MainPage/MainPage';
import axios from '../../../axios-shelp/axios-shelp';
import Google_logo from '../../../components/UI/Logo/google';


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
                    regex:/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
                   
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

    }
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


formHandler = (event)=> {
    event.preventDefault();
    const formData ={};
    for(let formElement in this.state.Form){
            formData[formElement]=this.state.Form[formElement].value;
     }
    
    axios.post('/login',formData)

    .then(response => {console.log('Success:', response) 
    
    if(response.status ===201 || response.status ===200) 
    alert("Account has been made") 
    else alert("Something went wrong")})


    .catch(error=>{console.log(error)});

}



render() {

    const formElementsArray =[];
    for(let key in this.state.Form ){
        formElementsArray.push({
            id:key,
            config:this.state.Form[key]
        });

    };

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
            <p className="forgot-password"> Forgot Password?</p>
            <button className="Sumbit-btn" type="sumbit" >Login</button>
            <p className="account-login"> New User? <a href="/">Sign up</a></p>
         

               
        </form> 
        </div>
    );


        return (
            <div className="SideContent">
                <MainPage
                heading1={"Resume your"}
                heading2={"learning with"}/>
                    {form}
            </div>
        );
    }
  
}

export default Login;