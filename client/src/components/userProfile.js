import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      checkIns: [],
      teammates: [],
      error: false
    }
  }

  async componentDidMount() {
    let host = window.location.hostname;
    let protocol = window.location.protocol;
    let url = null;

    if (host === "localhost") {
      url = protocol + "//" + host + ":5000"
    } else {
      url = protocol + "//" + host
    }

    await axios.get(`${url}/find-user`, {
      params: {username: this.props.match.params.username}
    })
    .then((response) => {
      this.setState({
        username: response.data.username
      });
    })
    .catch((err) => {
      this.setState({
        error: true
      })
    })
  }

  render() {
    const { username, checkIns, teammates } = this.state;
    return (
      <section id="user-profile">
        <section id="user" className="mdl-grid">
          <div className="mdl-cell mdl-cell--8-col">
            <h1 id="user-h">{username}</h1>
          </div>
        </section>
        <section id="check-ins">
          <p>CHECK INS WILL BE HERE</p>
        </section>
        <section id="teammates" className="mdl-grid">
          <div className="mdl-cell mdl-cell--8-col">
            <h4 id="teammates-h">Teammates</h4>
            <li>
                if (teammates === []) {
                  <p>No teammates yet!</p>
                } else {
                  <p>teammates not set up</p>
                }
            </li>
          </div>
        </section>
      </section>
    )

  }

}

export default Profile;
