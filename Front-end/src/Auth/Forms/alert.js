import React, {Component} from 'react';
import './alert.css';
import { Alert } from 'reactstrap';



class alert extends Component{


  state = {
    unvisible: false,
    

  }
  
  componentDidUpdate() {

    if(this.props.value===true) {
     
        setTimeout( ()=> this.setState({unvisible:true}) , 2000);
        console.log("alert2", this.state.unvisible); }
  
  }

  componentDidMount() {

  
       
        setTimeout( ()=> this.setState({unvisible:true}) , 2000);
        console.log("alert2", this.state.unvisible); 
  
  }


  render(){ 
    console.log("alert=>", this.state.unvisible,this.props.value); 
 
        let AlertColors = ["alertbox","alert", "alert-dismissible", "fade", "show"];

        if(this.props.alertType === "warning"){
          AlertColors.push("alert-warning");
        }

        
        if(this.props.alertType === "danger"){
          AlertColors.push("alert-danger");
        }

        if(this.props.alertType === "success"){
          AlertColors.push("alert-success");
        }

        if(this.state.unvisible){
          AlertColors.push('unvisible');
        }

        else if(this.state.unvisible!==true){
          const index =AlertColors.indexOf('unvisible');
            if(index >-1) AlertColors.splice(index,1);
        }
        

    return(

    <div style={{position:"fixed"}} className={AlertColors.join(' ')} role="alert">

    {this.props.alertMsg}


  </div>



    )}}

export default alert;