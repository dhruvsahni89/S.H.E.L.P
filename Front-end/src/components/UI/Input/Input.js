import React from 'react';
import './Input.css';



const input = (props)=> {

    let inputElement= null;
    const inputclasses =["InputElement"];

    // if(props.invalid){
    //     inputclasses.push("Invalid");
    // }




    switch (props.elementType) {

        case('input'):  
          
            inputElement = <input 
            {...props.elementConfig}
            className={inputclasses.join(' ')}
            value={props.value}
            onChange={props.changed}
            />;
            break;

        case('textarea'):
        inputElement=<textarea 
        value={props.value}  
        c//lassName={inputclasses.join(' ')}
         {...props.elementConfig} 
         onChange={props.changed}/>
            break;


        default:
            
            inputElement = <input 
            //className={inputclasses.join(' ')}
            value={props.value} className="InputElement"
             {...props.elementConfig}
             onChange={props.changed}
             />;
    }

    return(
            <div className="Input">
            {inputElement}            
            </div>
    );
}

export default input;