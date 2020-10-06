import React, {Component} from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './Auth/Forms/Login/Login';
import Signup from './Auth/Forms/Signup/Signup';
import ResetPassword from './Auth/Forms/ResetPassword/ResetPassword';
import Cart from './components/UI/Cart/Cart'
import Otp from './Auth/Forms/Otp/Otp';
import Homepage from './components/UI/HomePage/Homepage';
import TeacherPage from './components/UI/Teacher/TeacherPage';
import TeacherHomePage from './components/UI/Teacher/TeacherHomepage/TeacherHomepage';
import TeacherEdit from './components/UI/Teacher/TeacherHomepage/TeacherEdit';
import CoursePage from './components/UI/CoursePage/CoursePage';
import Preference from './components/UI/HomePage/Preference';

class App extends Component {
  render(){

  return (

<BrowserRouter>
    <Layout>
      <Switch>

       <Route path="/signup" exact component={Signup}/>
       <Route path="/login" component={Login}/>
       <Route path="/signup/otp"  component={Otp}/>
       <Route path="/resetpassword"  component={ResetPassword}/>


       <Route path="/home/:CourseName" exact    render={props =>
       <Homepage key={props.location.pathname} {...props}/>}/>
       <Route path="/home/Interest/Preference" exact component={Preference}/>

        <Route path="/course/:Course/:Courseid" exact    render={props =>
       <CoursePage key={props.location.pathname} {...props}/>}/>


       <Route path="/Cart" component={Cart}/>

       <Route path="/Teacher" component={TeacherPage}/>

       <Route path="/TeacherHome" component={TeacherHomePage}/>
          <Route path="/TeacherEdit" component={TeacherEdit}/>
       <Redirect to="/home/all"/>


       </Switch>
    </Layout>
  </BrowserRouter>


  );
}}

export default App;