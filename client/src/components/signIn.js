import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      showError: false,
      loggedIn: false,
      loginError: false,
      inputInvalid: false
    }
  }

  handleChange = value => e => {
    this.setState({ [value]: e.target.value });
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
      .then(response => {
        this.setState({
          loggedIn: this.props.loggedIn,
          showError: false
        })
      })
      .catch(err => {
        if(err === "Invalid username or password") {
          this.setState = {
            messageFromServer: err,
            showError: true,
            loginError: true
          }
        }
      })
    }
  }

  render() {
    const { username, password, loggedIn } = this.state;

    if(!loggedIn) {
      return(
        <div className="mdl-grid">
          <div className="mdl-cell">
            <div className="mdl-card mdl-shadow--6dp">
        			<div className="mdl-card__title mdl-color--primary mdl-color-text--white">
        				<h2 className="mdl-card__title-text">FitFeel</h2>
        			</div>
        	  	<div className="mdl-card__supporting-text">
        				<form id="signIn-form" onSubmit={ (e) => this.signIn(e)}>
        					<div className="mdl-textfield mdl-js-textfield">
        						<input
                    className="mdl-textfield__input"
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.handleChange('username')}
                    />
        						<label className="mdl-textfield__label" htmlFor="username">Username</label>
        					</div>
        					<div className="mdl-textfield mdl-js-textfield">
        						<input
                    className="mdl-textfield__input"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange('password')}
                    />
        						<label className="mdl-textfield__label" htmlFor="password">Password</label>
        					</div>
                  <div className="mdl-card__actions mdl-card--border">
            				<button
                    className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                    onClick={() => {this.props.toggleLoggedIn(); this.props.getURL()}}
                    type="submit">Log in</button>
            			</div>
        				</form>
        			</div>
        		</div>
          </div>
        </div>
      )
    }

    return <Redirect to={{
      pathname: `/user/${username}`,
      state: {
        loggedIn: this.state.loggedIn,
      }
    }} />
  }

}

export default SignIn;
