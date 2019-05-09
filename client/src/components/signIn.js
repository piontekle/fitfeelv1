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
    const { username, password } = this.state;

    if (username === '' || password === '') {
      this.setState({
        showError: true,
        inputInvalid: true
      });
    } else {
      axios
      .post("http://localhost:5000/sign-in", {
        username,
        password
      })
      .then(response => {
        this.setState({
          loggedIn: true,
          showError: false
        })
        console.log(this.state.loggedIn)
      })
      .catch(err => {
        if(err.response.data === "Invalid username or password") {
          this.setState = {
            messageFromServer: err.data.message,
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
            				<button className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" type="submit">Log in</button>
            			</div>
        				</form>
        			</div>
        		</div>
          </div>
        </div>
      )
    }

    return <Redirect to={`/user/${username}`} />
  }

}

export default SignIn;
