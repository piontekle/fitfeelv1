import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './static/navbar';
import Home from './static/home';
import About from './static/about';
import SignUp from './user/signUp';
import SignIn from './user/signIn';
import Profile from './user/userProfile';
import CheckIn from './checkIn/checkIn';
import ShowCheckIn from './checkIn/checkInShow';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url : null,
      loggedIn: false,
      userId: '',
      username: ''
    };

    this.connectToServer = this.connectToServer.bind(this);
    this.getURL = this.getURL.bind(this);
    this.setUser = this.setUser.bind(this);
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

  setUser(username, id) {
    this.setState({
      username: username,
      userId: id
    });
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
    this.getURL();
  }

  render() {
    const { loggedIn, url, username, userId } = this.state;

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
                    loggedIn={loggedIn}
                    username={username}
                    />}
                  />
                  <Route path='/about-ff' component={About}/>
                  <Route path='/sign-up'
                  render={(props) =>
                    <SignUp {...props}
                    url={url}
                    />}
                  />
                  <Route path='/sign-in'
                  render={(props) =>
                    <SignIn {...props}
                    url={url}
                    toggleLoggedIn={() => this.toggleLoggedIn()}
                    setUser={(username, id) => this.setUser(username, id)}
                    username={username}
                    loggedIn={loggedIn}
                    />}
                  />
                  <Route path='/user/:username'
                  render={(props) =>
                    <Profile {...props}
                    url={this.state.url}
                    username={this.state.username}
                    loggedIn={this.state.loggedIn}
                    />}
                  />
                  <Route path='/check-in/:title'
                  render={(props) =>
                    <ShowCheckIn {...props}
                    url={url}
                    />}
                  />
                  <Route path='/check-in'
                  render={(props) =>
                    <CheckIn {...props}
                    url={url}
                    userId={userId}
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
