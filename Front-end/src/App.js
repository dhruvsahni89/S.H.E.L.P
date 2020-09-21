import React, {Component} from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './container/Forms/Login/Login';
import Signup from './container/Forms/Signup/Signup';

class App extends Component {
  render(){
  return (

<BrowserRouter>
    <Layout>
      <Switch>

       <Route path="/" exact component={Login}/> 
       <Route path="/login" component={Login}/>
       <Route path="/signup" component={Signup}/>
       <Redirect to="/"/>


       </Switch>
    </Layout>
  </BrowserRouter>


  );
}}

export default App;