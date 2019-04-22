import React, { Component } from 'react';
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
    const { username, email, password, passwordConfirm } = this.state;
    if (username === '' || email === '' || password === '') {
      this.setState({
        showError: true,
        loginError: false,
        inputInvalid: true
      })
    } else {
      axios
      .post("http://localhost:5000/sign-up", {
        username,
        email,
        password,
        passwordConfirm
      })
      .then(response => {
        console.log(response.data.message);
        this.setState({
          messageFromServer: response.data.message,
          showError: false,
          loginError: false,
          inputInvalid: false
        });
      })
      .catch(err => {
        console.log(err.response.data);
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
    const { username, email, password, passwordConfirm } = this.state;

    return(
      <div className="mdl-grid">
        <div className="section--center mdl-cell">
          <div class="mdl-card mdl-shadow--6dp">
            <div class="mdl-card__title mdl-color--primary mdl-color-text--white">
              <h2 class="mdl-card__title-text">FitFeel</h2>
            </div>
            <div class="mdl-card__supporting-text">
              <form id="signUpForm" onSubmit={ (e) => this.signUp(e)}>
                <div class="mdl-textfield mdl-js-textfield">
                  <input
                    class="mdl-textfield__input"
                    type="text"
                    id="username"
                    value={username}
                    onChange={this.handleChange("username")}
                  />
                  <label class="mdl-textfield__label" for="username">Username</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                  <input
                  class="mdl-textfield__input"
                  type="text"
                  id="email"
                  value={email}
                  onChange={this.handleChange("email")}
                  />
                  <label class="mdl-textfield__label" for="email">Email</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                  <input
                  class="mdl-textfield__input"
                  type="password"
                  id="password"
                  value={password}
                  onChange={this.handleChange("password")}
                />
                  <label class="mdl-textfield__label" for="password">Password</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                  <input
                  class="mdl-textfield__input"
                  type="password"
                  id="passConfirm"
                  value={passwordConfirm}
                  onChange={this.handleChange("passwordConfirm")}
                  />
                  <label class="mdl-textfield__label" for="passConfirm">Confirm Password</label>
                </div>
                <div class="mdl-card__actions mdl-card--border">
                  <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" type="submit">Sign Up</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }

}

export default SignUp;
