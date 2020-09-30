import React, {Component} from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './Auth/Forms/Login/Login';
import Signup from './Auth/Forms/Signup/Signup';
import Cart from './components/UI/Cart/Cart'
import Otp from './Auth/Forms/Otp/Otp';
import Homepage from './components/UI/HomePage/Homepage';
import TeacherPage from './components/UI/Teacher/TeacherPage'
import Rating from './components/UI/Rating';
import CoursePage from './components/UI/CoursePage/CoursePage';

class App extends Component {
  render(){
    
  return (

<BrowserRouter>
    <Layout>
      <Switch>

       <Route path="/" exact component={Homepage}/> 
       <Route path="/Rating"  component={Rating}/> 
       
       <Route path="/home/:CourseName" exact    render={props => 
       <Homepage key={props.location.pathname} {...props}/>}/>

      <Route path="/course/:Course/:Courseid" exact    render={props => 
       <CoursePage key={props.location.pathname} {...props}/>}/>
 

       <Route path="/signup" exact component={Signup}/>
       <Route path="/login" component={Login}/>
       <Route path="/signup/otp"  component={Otp}/>
       <Route path="/Cart" component={Cart}/>

       <Route path="/Teacher" component={TeacherPage}/>
       <Redirect to="/"/>


       </Switch>
    </Layout>
  </BrowserRouter>


  );
}}

export default App;