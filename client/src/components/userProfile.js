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
    .then((res) => {
      this.setState({
        username: res.data.username,
        userId: res.data.id,
        checkIns: res.data.checkIns
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
    const { username, teammates, checkIns } = this.state;
      if(!this.props.loggedIn){
        return <Redirect to="/" />
      }

      return (
        <section id="user-profile">
          <section id="user" className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
              <h2 id="user-h">{username}</h2>
              <div id="check-ins">
                <h4>Check Ins   <Link to="/check-in">
                    <i className="material-icons">add_comment</i>
                  </Link>
                </h4>
                <p>CHECK INS WILL BE HERE</p>
                <ul>
                  {
                    checkIns ?
                      checkIns.map((checkIn, i) =>
                        <li key={i}> {checkIn.title} </li>
                      ) : <li> No Check Ins yet! </li>
                  }
                </ul>
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
