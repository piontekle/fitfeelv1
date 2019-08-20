import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
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
          <h3 className="header-text"> Hello, {username}!</h3>
          <h6 className="header-text">How are you feeling today?</h6>
          <section id="user" className="mdl-grid">
            <div className="mdl-cell mdl-cell--5-col">
              <div className="mdl-card mdl-shadow--6dp" style={style.card}>
                <div id="check-ins">
                <div className="mdl-card__title mdl-color--primary mdl-color-text--white">
                  <h2 className="mdl-card__title-text">Check Ins
                    <Link to={"/check-in"}>
                      <i className="material-icons" style={style.header}>add_comment</i>
                    </Link>
                  </h2>
                </div>
                  <Table>
                    <TableHead>
                      <TableCell>Title</TableCell>
                      <TableCell align="right">Pre?</TableCell>
                      <TableCell align="right">Post?</TableCell>
                    </TableHead>
                    <TableBody>
                      {
                        checkIns ?
                          checkIns.map((checkIn) =>
                            <TableRow key={checkIn.id} hover>
                              <CheckIn checkIn={checkIn} />
                            </TableRow>
                          )
                          : <TableRow> No Check Ins yet! </TableRow>
                      }
                    </TableBody>
                  </Table>
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


const CheckIn = ({ checkIn }) => (
  <>
    <TableCell>
      <Link to={`/check-in/${checkIn.id}`} key={checkIn.id}>
        {checkIn.title}
      </Link>
    </TableCell>
    <TableCell align="right">
      <i className="material-icons">check_circle_outline</i>
    </TableCell>
    <TableCell align="right">
      {
        checkIn.postCheck === null ?
        <Link to={`/check-in/${checkIn.id}/post`} key={checkIn.id}>
          <i className="material-icons">add_comment</i>
        </Link>
        : <i className="material-icons">check_circle_outline</i>
      }
    </TableCell>
  </>
)

export default Profile;
