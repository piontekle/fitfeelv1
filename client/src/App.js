import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import About from './components/about';
import SignUp from './components/signUp';
import SignIn from './components/signIn';
import Profile from './components/userProfile';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url : null,
      loggedIn: false
    };
    this.connectToServer = this.connectToServer.bind(this);
  }

  connectToServer() {
    fetch('/');
  }

  getURL() {
    let host = window.location.hostname;
    let protocol = window.location.protocol;
    let url = null;

    if (host === "localhost") {
      url = protocol + "//" + host + ":5000"
    } else {
      url = protocol + "//" + host
    }

    this.setState({ url: url });
  }

  toggleLoggedIn() {
    this.setState({ loggedIn: !this.state.loggedIn});
  }

  componentDidMount() {
    this.connectToServer();
  }

  render() {
    return (
      <div className="mdl-demo mdl-color--grey-100 mdl-color-text--grey-700 mdl-base">
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <header className="mdl-layout__header">
                <Navbar
                loggedIn={this.state.loggedIn}
                />
          </header>
          <div className="mdl-layout mdl-js-layout mdl-color--grey-100">
            <main className="mdl-layout__content">
              <div className="page-content">
                <Switch>
                  <Route exact path='/' component={Home}/>
                  <Route path='/about-ff' component={About}/>
                  <Route path='/sign-up'
                  render={(props) =>
                    <SignUp {...props} getURL={() => this.getURL()} />}
                  />
                  <Route path='/sign-in'
                  render={(props) =>
                    <SignIn {...props}
                    getURL={() => this.getURL()}
                    url={this.state.url}
                    toggleLoggedIn={() => this.toggleLoggedIn()}
                    loggedIn={this.state.loggedIn}
                    />}
                  />
                  <Route path='/user/:slug' component={Profile}/>
                </Switch>

              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
