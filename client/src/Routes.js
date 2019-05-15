import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import SignUp from './components/signUp';
import SignIn from './components/signIn';
import Profile from './components/userProfile';

const Routes = () => (
  <div>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/about-ff' component={About}/>
      <Route path='/sign-up' component={SignUp}/>
      <Route path='/sign-in' component={SignIn}/>
      <Route path='/user/:slug' component={Profile}/>
    </Switch>
  </div>
)

export default Routes;
