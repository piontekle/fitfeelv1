import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.match.params.slug,
      userId: '',
      checkIns: [],
      teammates: [],
      error: false
    }
  }

  async componentDidMount() {
    let url=this.props.url;


    await axios.get(`${url}/find-user`, {
      params: {username: this.props.match.params.slug}
    })
    .then((response) => {
      this.setState({
        username: response.data.username,
        userId: response.data.id
      });
      
      this.props.setUser(this.state.username, this.state.userId);
    })
    .catch((err) => {
      console.log(err)
      this.setState({
        error: true
      })
    });
  }

  render() {
    const { username, teammates } = this.state;
      if(!this.props.loggedIn){
        return <Redirect to="/" />
      }

      return (
        <section id="user-profile">
          <section id="user" className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
              <h3 id="user-h">{username}      <Link to="/check-in">
                    <i className="material-icons">
                    add_comment
                    </i>
                  </Link>
              </h3>
              <div id="check-ins">
                <p>CHECK INS WILL BE HERE</p>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--5-col">
              <h4 id="teammates-h">Teammates</h4>
              <li>
                  {
                    teammates === [] ? (<p>No teammates yet!</p>) : (<p>teammates not set up</p>)
                }
              </li>
            </div>
          </section>
        </section>
      )

  }

}

export default Profile;
