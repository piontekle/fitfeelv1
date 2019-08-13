import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.match.params.username,
      userId: '',
      checkIns: [],
      teammates: [],
      error: false
    }
  }

  async componentDidMount() {
    let url=this.props.url;


    await axios.get(`${url}/find-user`, {
      params: {username: this.state.username}
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
    const { teammates, checkIns } = this.state;
      if(!this.props.loggedIn){
        return <Redirect to="/" />
      }

      const style = {
        card: {
          margin: "auto",
          minWidth: 300
        },
        header: {
          right: 25,
          position: "absolute"
        }
      }

      return (
        <section id="user-profile">
        <div className="mdl-grid">
          <h3> Hello, {this.state.username}!</h3>
          <h6>How are you feeling today?</h6>
        </div>
          <section id="user" className="mdl-grid">
            <div className="mdl-cell mdl-cell--5-col">
              <div className="mdl-card mdl-shadow--6dp" style={style.card}>
                <div id="check-ins">
                <div className="mdl-card__title mdl-color--primary mdl-color-text--white">
                  <h2 className="mdl-card__title-text">Check Ins
                    <Link to={{
                      pathname: "/check-in",
                      state: {
                        userId: this.state.userId
                      }
                    }}>
                      <i className="material-icons" style={style.header}>add_comment</i>
                    </Link>
                  </h2>
                </div>
                  <List>
                    {
                      checkIns ?
                        checkIns.map((checkIn) =>
                        <Link to={`/check-in/${checkIn.title}`}>
                          <ListItem button key={checkIn.id}>{checkIn.title}</ListItem>
                        </Link>
                        )
                        : <ListItem> No Check Ins yet! </ListItem>
                    }
                  </List>
                </div>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--5-col">
              <div className="mdl-card mdl-shadow--6dp">
                <div className="mdl-card__title mdl-color--primary mdl-color-text--white">
                  <h2 id="user-h" className="mdl-card__title-text">Teammates</h2>
                </div>
                <List>
                    {
                      teammates === [] ? (<li>No teammates yet!</li>) : (<ListItem>feature coming soon</ListItem>)
                  }
                </List>
              </div>
            </div>
          </section>
        </section>
      )

  }

}

export default Profile;
