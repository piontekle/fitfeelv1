import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      messageFromServer: '',
      showError: false,
      inputInvalid: false,
      loginError: false
    };
  }

  handleChange = value => e => {
    this.setState({ [value]: e.target.value });
  }


  signUp(e) {
    e.preventDefault();

    let host = window.location.hostname;
    let protocol = window.location.protocol;
    let url = null;

    if (host === "localhost") {
      url = protocol + "//" + host + ":5000"
    } else {
      url = protocol + "//" + host
    }


    const { username, email, password, passwordConfirm } = this.state;
    if (username === '' || email === '' || password === '') {
      this.setState({
        showError: true,
        loginError: false,
        inputInvalid: true
      })
    } else {
      axios
      .post(`${url}/sign-up`, {
        username,
        email,
        password,
        passwordConfirm
      })
      .then(response => {
        this.setState({
          messageFromServer: response.data.message,
          showError: false,
          loginError: false,
          inputInvalid: false
        });
      })
      .catch(err => {
        console.log(err.response.data)
        if (err.response.data === "Username or email already taken") {
          this.setState({
            showError: true,
            loginError: true,
            inputInvalid: false
          })
        }
      })
    }

  }

  render() {
    const { username, email, password, passwordConfirm, messageFromServer } = this.state;

    if (messageFromServer === '') {
      return(
        <div className="mdl-grid">
          <div className="section--center mdl-cell">
            <div className="mdl-card mdl-shadow--6dp">
              <div className="mdl-card__title mdl-color--primary mdl-color-text--white">
                <h2 className="mdl-card__title-text">FitFeel</h2>
              </div>
              <div className="mdl-card__supporting-text">
                <form id="signUpForm" onSubmit={ (e) => this.signUp(e)}>
                  <div className="mdl-textfield mdl-js-textfield">
                    <input
                      className="mdl-textfield__input"
                      type="text"
                      name="username"
                      value={username}
                      onChange={this.handleChange("username")}
                    />
                    <label className="mdl-textfield__label" htmlFor="username">Username</label>
                  </div>
                  <div className="mdl-textfield mdl-js-textfield">
                    <input
                    className="mdl-textfield__input"
                    type="text"
                    name="email"
                    value={email}
                    onChange={this.handleChange("email")}
                    />
                    <label className="mdl-textfield__label" htmlFor="email">Email</label>
                  </div>
                  <div className="mdl-textfield mdl-js-textfield">
                    <input
                    className="mdl-textfield__input"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange("password")}
                  />
                    <label className="mdl-textfield__label" htmlFor="password">Password</label>
                  </div>
                  <div className="mdl-textfield mdl-js-textfield">
                    <input
                    className="mdl-textfield__input"
                    type="password"
                    name="passConfirm"
                    value={passwordConfirm}
                    onChange={this.handleChange("passwordConfirm")}
                    />
                    <label className="mdl-textfield__label" htmlFor="passConfirm">Confirm Password</label>
                  </div>
                  <div className="mdl-card__actions mdl-card--border">
                    <button className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" type="submit">Sign Up</button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      )
    }

    if (messageFromServer === 'user created') {
        return <Redirect to="./sign-in" />;
    }

  }

}

export default SignUp;
