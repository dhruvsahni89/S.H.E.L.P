import React, {Component} from 'react';
import '../Form.css';
import Input from '../../../components/UI/Input/Input';
import MainPage from '../../../components/UI/MainPage/MainPage';


class Signup extends Component {

    state = {
        Form: {

            
                name: {
                    elementType:'input',
                    elementConfig: {
                        type:'text',
                        placeholder: 'Your First Name'
                    },

                value: '',
                error: " ",
                
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:15
                },
                valid: false
            },

            Email: {
                elementType:'input',
                elementConfig: {
                    type:'email',
                    placeholder: 'Your Email'
                },

            value: '',
            error: " ",

            validation: {
                required: true,
                
            },
            valid: false
        },


            password: {
                elementType:'input',
                elementConfig: {
                    type:'password',
                    placeholder: 'Your Password'
                },

            value: '',
            error: " ",

            validation: {
                required: true,
                minLength:5,
                maxLength:15
            },
            valid: false
        },
                

        }
    }


//   runs whenever there is any change in the input field
    inputchangeHandler = (event,inputIdentifier)=> {
        const updatedForm = {
            ...this.state.Form
        }
        const updatedElement = {...updatedForm[inputIdentifier]}

        updatedElement.value = event.target.value;
        // validitycheck
        updatedForm[inputIdentifier] = updatedElement;
        this.setState({Form: updatedForm});

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

          <div>
              <button className="google-btn">Continue with google</button>
          
            <form>
            
                {
                    formElementsArray.map(x=> (

                      <Input 
                        key={x.id}
                        elementType={x.config.elementType}
                        elementConfig={x.config.elementConfig}
                        value={x.config.value}
                       //invalid={!x.config.valid}
                        changed={(event)=> this.inputchangeHandler(event,x.id)}/>
                    ))
                }
                <button className="Sumbit-btn">Create account</button>
                
                {/* <Button btnType="Success" clicked= {this.orderHandler}>ORDER</Button> */}
            
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

export default Signup;