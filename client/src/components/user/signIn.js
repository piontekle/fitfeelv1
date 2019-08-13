import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Popup from 'reactjs-popup';
import axios from 'axios';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      messageFromServer: [],
      showError: false,
      loggedIn: this.props.loggedIn,
      loginError: false,
      inputInvalid: false
    }

    this.resetError = this.resetError.bind(this)
  }

  handleChange = value => e => {
    this.setState({ [value]: e.target.value });
  }

  resetError() {
    this.setState({
      messageFromServer: [],
      showError: false,
      inputInvalid: false,
      loginError: false
    });
  }

  signIn(e) {
    e.preventDefault();
    let url = this.props.url;

    const { username, password } = this.state;

    if (username === '' || password === '') {
      this.setState({
        showError: true,
        inputInvalid: true
      });
    } else {
      axios.post(`${url}/sign-in`, {
        username,
        password
      })
      .then(res => {
        this.props.toggleLoggedIn();
        this.setState({
          loggedIn: this.props.loggedIn,
          showError: false,
          loginError: false,
          inputInvalid: false
        })
      })
      .catch(err => {
        if(err.response.data) {
          this.setState({
            messageFromServer: err.response.data.message,
            showError: true,
            loginError: true,
            inputInvalid: false
          })
        }
      })
    }
  }

  render() {
    const { username, password, loggedIn, messageFromServer, showError, loginError } = this.state;

    const formStyle = {
      textField: {
        width: 275
      }
    }

    if(!loggedIn) {
      return(
        <div className="mdl-grid">
          <div className="section--center mdl-grid mdl-card mdl-shadow--6dp">
            <div className="mdl-card">
        			<div className="mdl-card__title mdl-color--primary mdl-color-text--white">
        				<h2 className="mdl-card__title-text">FitFeel</h2>
        			</div>
        	  	<div className="mdl-card__supporting-text">
        				<form id="signIn-form" onSubmit={ (e) => this.signIn(e)}>
        					<div className="mdl-textfield mdl-js-textfield">
                    <TextField
                    style={formStyle.textField}
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={this.handleChange('username')}
                    />
        					</div>
        					<div className="mdl-textfield mdl-js-textfield">
                    <TextField
                    style={formStyle.textField}
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={this.handleChange('password')}
                    />
        					</div>
                  <div className="mdl-card__actions mdl-card--border">
            				<button
                    className="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect"
                    onClick={this.props.getURL}
                    type="submit">Log in</button>
            			</div>
        				</form>
        			</div>
        		</div>
          </div>
          <Popup
            open={showError}
            closeOnDocumentClick
            onClose={this.resetError}
          >
              <ul>
                {
                  loginError ?
                  <li>{messageFromServer}</li> : <li>all lines must be filled out</li>
                }
              </ul>
          </Popup>
        </div>
      )
    }

    return <Redirect to={`/user/${username}`} />
  }

}

export default SignIn;
