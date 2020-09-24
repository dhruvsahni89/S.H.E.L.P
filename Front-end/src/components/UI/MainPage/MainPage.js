import React from 'react';
import Aux from '../../../hoc/reactFrag';
import './MainPage.css';

const mainPage = (props)=> {



        return(

            <Aux >
                <h1 className="Content-text"><span className="heading-1">{props.heading1}</span> 
                <br/><span className="heading-2">{props.heading2}</span>
                <br/><span className="heading-3">S-</span><span className="heading-4">HELP</span></h1>
            </Aux>

        );
    
}

export default mainPage;