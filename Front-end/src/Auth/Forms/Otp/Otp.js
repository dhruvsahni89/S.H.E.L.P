import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import '../Form.css';
import Input from '../../../components/UI/Input/Input';
import MainPage from '../../../components/UI/MainPage/MainPage';
import axios from '../../../axios-shelp/axios-shelp';
import SpinnerButton from '../../../components/UI/Spinners/SpinnerButton';
import SumbitButton from '../../../components/UI/Buttons/SumbitButton';

class Otp extends Component {

    state = { 
            Form:{
                 Otp: {

                    placeholder: 'Enter your OTP',
                    value: "",
                    valid: false,
                    type: 'number',
                    error: " ",
                    msg: '',

                    validation: {
                        required: true,
                        minLength:6,
              
                    },

                    touched: false,
                
            },

        },
        loading:false,
        Signup_token:localStorage.getItem('token'),
        redirect:null
       
    }
    

    checkValidity(value,rules){
        let isValid = true;
        if(rules.required){
            isValid =value.trim()!=='' && isValid;
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
        
            let formData ={};

            for(let formElement in this.state.Form){
                    formData[formElement]=this.state.Form[formElement].value
            }

            formData.token = this.state.Signup_token;
            console.log(formData);

            
            axios.post('/signup/otp',formData)

            .then(response => {console.log('Success:', response) 
            this.setState({loading:false});
            
            if(response.status ===201 || response.status ===200) 
           
            {localStorage.removeItem('token', response.data.token) 
            this.setState({ redirect: "/login" });}

            else alert("Something went wrong")})


            .catch(error=>{console.log(error)});
        }
        else alert("Make sure the Validations are correct");

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

        let SigninSumbitButton= <SumbitButton className={"Sumbit-btn"} Label={"Confirm OTP"}/>;
   
        if(this.state.loading){
            SigninSumbitButton= <SpinnerButton spinnerclass={"Sumbit-btn"}/>;
    }

        let form = (
          <div className="login-form">
              
            <form onSubmit={this.formHandler} >
            
                {
                    formElementsArray.map(x=> (

                      <Input 
                        key={x.id}
                        placeholder={x.config.placeholder}
                        value={x.config.value}
                        type={x.config.type}
                        invalid={!x.config.valid}
                     //   touched={x.config.touched}
                       errors={x.config.error}
                     //   msg={x.config.msg}
                        changed={(event)=> this.inputchangeHandler(event,x.id)}/>

                    ))
                }
               <p className="forgot-password"> Resend Otp?</p>
                {SigninSumbitButton}
                <p className="account-login"> Already have an account? <a href="/">Login</a></p>
                 <hr/>
         
            </form> 
            </div>
        );

        return (
            <div className="SideContent">
                
                <MainPage 
                heading1={"Please Confirm "}
                heading2={"your Email Adress"}/>

                    {form}
            </div>
        );
    }
  
}


export default Otp;