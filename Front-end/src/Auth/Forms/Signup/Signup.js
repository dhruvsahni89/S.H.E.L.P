import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from "../../../ApiServices/auth.service";
import '../Form.css';
import Input from '../../../components/UI/Input/Input';
import MainPage from '../../../components/UI/MainPage/MainPage';
import Google_logo from '../../../components/UI/Logo/google';
import SpinnerButton from '../../../components/UI/Spinners/SpinnerButton';
import SumbitButton from '../../../components/UI/Buttons/SumbitButton';



class Signup extends Component {

    state = { 
            Form:{
                 name: {

                    placeholder: 'First Name',
                    value: "",
                    valid: false,
                    type: 'text',
                    error: " ",
                    msg: '',

                    validation: {
                        required: true,
                        minLength:5,
                        maxLength:15
                    },

                    touched: false,
                
            },
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

        },
        loading:false,
        redirect:null
       
    }


    checkValidity(value,rules){
        let isValid = true;
        const regex=rules.regex;

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
            
        // msg errrors for username

        if(inputIdentifier ==='name' && !updatedElement.valid){
            updatedElement.error = "At least 5 characters and at most 15";
            updatedElement.msg="";
        }
        if(inputIdentifier ==='name' && updatedElement.valid){
            updatedElement.error="";
            updatedElement.msg="All good!";
        }

        //msg errors for password

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
           
            localStorage.setItem('email',this.state.Form["email"].value);
         
            const formData ={};
            for(let formElement in this.state.Form){
                    formData[formElement]=this.state.Form[formElement].value;
            }
            console.log(formData);
            
            AuthService.register(formData).then(
                ()=>{ 
                    // this.setState({ redirect: "/signup/otp" });this.props.history.push("/profile");
                    this.props.history.push("/signup/otp");

                  //  window.location.reload();

                  
                }
            )
        }
        else alert("Make sure the Validations are correct");

    }

    logout=() => {
        AuthService.logout();
        console.log(localStorage.getItem('user'))
    }



    render() {

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

        let SigninSumbitButton= <SumbitButton className={"Sumbit-btn"} Label={"Create Account"}/>;
   
        if(this.state.loading){
            SigninSumbitButton= <SpinnerButton spinnerclass={"Sumbit-btn"}/>;
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
               
                {SigninSumbitButton}
                <p className="account-login"> Already have an account? <a href="/">Login</a></p>
                 <hr/>

                 <p className="Link-teach" onClick={this.logout} >Teach on S-help</p>          
            </form> 
            </div>
        );

        return (
            <div className="SideContent">
                
                <MainPage 
                shelp={true}
                heading1={"Start your"}
                heading2={"learning with"}/>

                    {form}
            </div>
        );
    }
  
}


export default Signup;