import React from 'react';
import Aux from '../../../hoc/ReactFrag';
import './MainPage.css';

const mainPage = (props)=> {

    let shelp = null;

    if(props.shelp){
            
            shelp = (<reactFrag><br/><span className="heading-3">S-</span>
                        <span className="heading-4">HELP</span>
                        </reactFrag>); 

                  }


        return(

            <Aux >
                <h1 className="Content-text"><span className="heading-1">{props.heading1}</span> 
                <br/><span className="heading-2">{props.heading2}</span>

               {shelp} 
               </h1>
            </Aux>

        );
    
}

export default mainPage;