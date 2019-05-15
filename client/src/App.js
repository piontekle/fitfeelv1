import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import Navbar from './components/navbar';

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
    return url;
  }

  toggleLoggedIn() {
    console.log("****toggling*****")
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
                <Navbar />
          </header>
          <div className="mdl-layout mdl-js-layout mdl-color--grey-100">
            <main className="mdl-layout__content">
              <div className="page-content">
                <Routes />

              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
