import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
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
      loggedIn: false,
      username: ''
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

  setUsername(username) {
    this.setState({username: username});
  }

  logout = (e) => {
    e.preventDefault();
    axios.post(`${this.state.url}/sign-out`)
    .then(response => {
      this.toggleLoggedIn();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.connectToServer();
  }

  render() {
    const { loggedIn, url } = this.state;
    return (
      <div className="mdl-demo mdl-color--grey-100 mdl-color-text--grey-700 mdl-base">
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <header className="mdl-layout__header">
                <Navbar
                loggedIn={loggedIn}
                logout={(e) => this.logout(e)}
                />
          </header>
          <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">FitFeel</span>
            <nav className="mdl-navigation">
              <Link to="/" className="mdl-navigation__link">Home</Link>
              <Link to="/about-ff" className="mdl-navigation__link">About FitFeel</Link>
              {
                this.state.loggedIn ? (<Link to="/sign-out" className="mdl-navigation__link" onClick={(e) => this.logout(e)}>Sign Out</Link>) :
                (<><Link to="/sign-up" className="mdl-navigation__link">Sign Up</Link>
                <Link to="/sign-in" className="mdl-navigation__link">Sign In</Link></>)
              }
            </nav>
          </div>
          <div className="mdl-layout__drawer-button"
            role="button" aria-expanded="false">
            <i className="material-icons">menu</i>
          </div>
          <div className="mdl-layout mdl-js-layout mdl-color--grey-100">
            <main className="mdl-layout__content">
              <div className="page-content">
                <Switch>
                  <Route exact path='/'
                  render={(props) =>
                    <Home {...props}
                    loggedIn={this.state.loggedIn}
                    username={this.state.username}
                    />}
                  />
                  <Route path='/about-ff' component={About}/>
                  <Route path='/sign-up'
                  render={(props) =>
                    <SignUp {...props}
                    getUrl={() => this.getURL()}
                    url={url}
                    />}
                  />
                  <Route path='/sign-in'
                  render={(props) =>
                    <SignIn {...props}
                    getURL={() => this.getURL()}
                    url={url}
                    toggleLoggedIn={() => this.toggleLoggedIn()}
                    loggedIn={loggedIn}
                    setUsername={(username) => this.setUsername(username)}
                    />}
                  />
                  <Route path='/user/:slug'
                  render={(props) =>
                    <Profile {...props}
                    url={this.state.url}
                    loggedIn={this.state.loggedIn}
                    />}
                  />
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
