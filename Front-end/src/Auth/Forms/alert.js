import React from 'react';
import './alert.css';

const alert =(props)=>  {

   let AlertColors = ["alertbox","alert", "alert-dismissible", "fade", "show"];

   if(props.alertType === "warning"){
     AlertColors.push("alert-warning");
   }

   
   if(props.alertType === "danger"){
    AlertColors.push("alert-danger");
  }

  if(props.alertType === "success"){
    AlertColors.push("alert-success");
  }
  

    return(

    <div className=" " className={AlertColors.join(' ')} role="alert">

    {props.alertMsg}

    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  
    </button>

  </div>

    )}

export default alert;