import React, {Component} from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './Auth/Forms/Login/Login';
import Signup from './Auth/Forms/Signup/Signup';
import Homepage from './components/UI/HomePage/Homepage';

class App extends Component {
  render(){
  return (

<BrowserRouter>
    <Layout>
      <Switch>

       <Route path="/" exact component={Homepage}/> 
       <Route path="/signup" component={Signup}/>
       <Route path="/login" component={Login}/>
       <Redirect to="/"/>


       </Switch>
    </Layout>
  </BrowserRouter>


  );
}}

export default App;