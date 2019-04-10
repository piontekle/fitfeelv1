import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Home from './views/home';
import About from './views/about';
import SignUp from './views/signUp';
import SignIn from './views/signIn';

class App extends Component {
  render() {
    const App = () => (
      <div className="mdl-demo mdl-color--grey-100 mdl-color-text--grey-700 mdl-base">
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
              <span className="mdl-layout-title">FitFeel</span>
              <div className="mdl-layout-spacer"></div>
              <nav className="mdl-navigation mdl-layout--large-screen-only">
                <Link to="/" className="mdl-navigation__link">Home</Link>
                <Link to="/about-ff" className="mdl-navigation__link">About FitFeel</Link>
                <Link to="/sign-up" className="mdl-navigation__link">Sign Up</Link>
                <Link to="/sign-in" class="mdl-navigation__link">Sign In</Link>
              </nav>
            </div>
          </header>
          <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">FitFeel</span>
            <nav className="mdl-navigation">
              <Link to="/" className="mdl-navigation__link">Home</Link>
              <Link to="/about-ff" className="mdl-navigation__link">About FitFeel</Link>
              <Link to="/sign-up" className="mdl-navigation__link">Sign Up</Link>
              <Link to="/sign-in" class="mdl-navigation__link">Sign In</Link>
            </nav>
          </div>
          <main className="mdl-layout__content">
            <div className="page-content">
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/about-ff' component={About}/>
                <Route path='/sign-up' component={SignUp}/>
                <Route path='/sign-in' component={SignIn}/>
              </Switch>
            </div>
          </main>
        </div>
      </div>
    )

    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;
