import React from 'react';
import './Input.css';



const input = (props)=> {

    let inputElement= null;
    var inputclasses =["InputElement"];

    if(props.invalid && props.touched){
        
        const index =inputclasses.indexOf('pop');
        if(index>-1) inputclasses.splice(index,1);

        inputclasses.push("Invalid");
    
    }

    else if(props.touched){   
        const index =inputclasses.indexOf('pop');
        if(index>-1) inputclasses.splice(index,1);
          inputclasses.push("Valid"); }

    let error ="";

    if(props.msg!=="" && props.touched)  
        error = <p className="text-success error-msg">{props.msg}</p>;

    if(props.errors!=="" && props.touched)
        error= <p className="text-danger error-msg">{props.errors}</p>;
    
    else if(!props.touched) 
        error=<p></p>;


    console.log(error);

    inputElement = <input 
    type={props.type}
    placeholder={props.placeholder}
    className={inputclasses.join(' ')}
    value={props.value}
    onChange={props.changed}/>
    

    return(
            <div className="Input">
            
            {inputElement}
            
            {error}
            </div>
    );
}

export default input;