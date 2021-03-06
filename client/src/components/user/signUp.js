import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Popup from 'reactjs-popup';
import axios from 'axios';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      messageFromServer: [],
      showError: false,
      inputInvalid: false,
      loginError: false
    };

    this.resetError = this.resetError.bind(this)
    this.signUp = this.signUp.bind(this);
  }

  componentDidMount() {
    this.setState({ url: this.props.url });
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


  signUp(e) {
    e.preventDefault();
    let url = this.state.url;


    const { username, email, password, passwordConfirm } = this.state;
    if (username === '' || email === '' || password === '') {
      this.setState({
        messageFromServer: ["all lines must be filled out"],
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
        if (err.response.data) {
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
    const { username, email, password, passwordConfirm, messageFromServer, showError, loginError } = this.state;

    const formStyle = {
      textField: {
        width: 275
      }
    }

    if (!messageFromServer[0] || showError) {
      return(
        <div className="mdl-grid">
          <div className="section--center mdl-grid mdl-card mdl-shadow--6dp">
            <div className="mdl-card">
              <div className="mdl-card__title mdl-color--primary mdl-color-text--white">
                <h2 className="mdl-card__title-text">FitFeel</h2>
              </div>
              <div className="mdl-card__supporting-text">
                <form id="signUpForm" onSubmit={ (e) => this.signUp(e)}>
                  <div className="mdl-textfield mdl-js-textfield">
                    <TextField
                      style={formStyle.textField}
                      label="Username *"
                      name="username"
                      autoComplete="username"
                      value={username}
                      onChange={this.handleChange("username")}
                    />
                    <small>at least 4 characters, no special characters</small>
                  </div>
                  <div className="mdl-textfield mdl-js-textfield">
                    <TextField
                      style={formStyle.textField}
                      label="Email *"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={this.handleChange("email")}
                    />
                    <small>must be valid email</small>
                  </div>
                  <div className="mdl-textfield mdl-js-textfield">
                    <TextField
                      style={formStyle.textField}
                      label="Password *"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={this.handleChange("password")}
                    />
                    <small>at least 6 characters</small>
                  </div>
                  <div className="mdl-textfield mdl-js-textfield">
                    <TextField
                      style={formStyle.textField}
                      label="Confirm Password *"
                      name="passConfirm"
                      type="password"
                      autoComplete="new-password"
                      value={passwordConfirm}
                      onChange={this.handleChange("passwordConfirm")}
                    />
                    <small>must match above password</small>
                  </div>
                  <div className="mdl-card__actions mdl-card--border">
                    <button className="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect" type="submit">
                      Sign Up
                    </button>
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
                    messageFromServer.map(msg =>
                        <li>{msg.msg}</li>
                    ) :
                    <li>all lines must be filled out</li>
                  }
                </ul>
            </Popup>
        </div>
      )
    }

    if (messageFromServer === 'user created') {
        return <Redirect to="./sign-in" />;
    }

  }

}

export default SignUp;
