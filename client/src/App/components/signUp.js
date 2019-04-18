import React, { Component } from 'react';

class SignUp extends Component {

  render() {
    return(
      <div className="mdl-grid">
        <div className="section--center mdl-cell">
          <div class="mdl-card mdl-shadow--6dp">
            <div class="mdl-card__title mdl-color--primary mdl-color-text--white">
              <h2 class="mdl-card__title-text">FitFeel</h2>
            </div>
            <div class="mdl-card__supporting-text">
              <form action="#">
                <div class="mdl-textfield mdl-js-textfield">
                  <input class="mdl-textfield__input" type="text" id="username" />
                  <label class="mdl-textfield__label" for="username">Username</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                  <input class="mdl-textfield__input" type="text" id="email" />
                  <label class="mdl-textfield__label" for="email">Email</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                  <input class="mdl-textfield__input" type="password" id="userpass" />
                  <label class="mdl-textfield__label" for="userpass">Password</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                  <input class="mdl-textfield__input" type="text" id="passConfirm" />
                  <label class="mdl-textfield__label" for="passConfirm">Username</label>
                </div>
              </form>
            </div>
            <div class="mdl-card__actions mdl-card--border">
              <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default SignUp;
