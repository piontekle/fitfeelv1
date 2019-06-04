import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
/* import { Checkbox } from 'react-mdl'; */
import axios from 'axios';

class CheckIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      exercise: '',
      feelings: [],
      comment: '',
      checked: false,
      messageFromServer: '',
      checkInError: false,
      inputInvalid: false
    }
  }

  handleChange = value => e => {
    this.setState({ [value]: e.target.value });
  }

  handleClick(e) {
    console.log("clicked");

    console.log("value is: " + e.target.value);
    let feelings = this.state.feelings;

    if(this.checked) {
      feelings.push(e.target.value);
    } else {
      let i = feelings.indexOf(e.target.value);
      feelings.slice(i, 0);
    }

    this.setState({ feelings: feelings })
  }

  checkIn(e) {
    e.preventDefault();
    let url = this.props.url;

    const { title, exercise, feelings, comment, messageFromServer } = this.state;

    if (title === '' || exercise === '' || feelings === '') {
      this.setState({
        showError: true,
        inputInvalid: true
      })
    } else {
      axios.post(`${url}/check-in`, {
        title,
        exercise,
        feelings,
        comment
      })
      .then((res) => {
        this.setState({
          messageFromServer: res.data.message,
          showError: false,
          loginError: false,
          inputInvalid: false
        });
      })
      .catch((err) => {
        console.log(err.response.data)
        if (err.response.data === "check in incomplete") {
          this.setState({
            showError: true,
            checkInError: true,
            inputInvalid: false
          })
        }
      })
    }
  }

  render() {
    const { title, exercise, feelings, comment, checked, messageFromServer } = this.state;

    if (messageFromServer === '') {
      return(
        <div className="mdl-grid">
          <div className="section--center mdl-cell">
            <div className="mdl-card mdl-shadow--6dp">
              <div className="mdl-card__title mdl-color--primary mdl-color-text--white">
                <h2 className="mdl-card__title-text">Check In</h2>
              </div>
              <div className="mdl-card__supporting-text">
                <form id="checkInForm" onSubmit={ (e) => this.checkIn(e)}>
                  <div className="mdl-textfield mdl-js-textfield">
                    <input
                      className="mdl-textfield__input"
                      type="text"
                      name="title"
                      value={title}
                      onChange={this.handleChange("title")}
                    />
                    <label className="mdl-textfield__label" htmlFor="title">Title</label>
                  </div>
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select">
                    <input className="mdl-textfield__input" type="text" id="exercise" value={exercise} readOnly/>
                    <input type="hidden" value={exercise} name="exercise" />
                    <i className="mdl-icon-toggle__label material-icons">keyboard_arrow_down</i>
                    <label className="mdl-textfield__label" htmlFor="exercise">Exercise</label>
                    <ul htmlFor="exercise" className="mdl-menu mdl-menu--bottom-left mdl-js-menu">
                      <li className="mdl-menu__item" value="Bike" onChange={this.handleChange("exercise")}>Bike</li>
                      <li className="mdl-menu__item" data-val="Hike">Hike</li>
                      <li className="mdl-menu__item" data-val="Interval">Interval</li>
                      <li className="mdl-menu__item" data-val="Meditation">Meditation</li>
                      <li className="mdl-menu__item" data-val="Run">Run</li>
                      <li className="mdl-menu__item" data-val="Swim">Swim</li>
                      <li className="mdl-menu__item" data-val="Walk">Walk</li>
                      <li className="mdl-menu__item" data-val="Weights">Weights</li>
                      <li className="mdl-menu__item" data-val="Yoga">Yoga</li>
                      <li className="mdl-menu__item" data-val="Other">Other</li>
                    </ul>
                  </div>
                  <fieldset>
                    <legend><b>I'm feeling:</b></legend>
                    <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="Energized">
                        <input type="checkbox" name="feelings[]" className="mdl-checkbox__input" value="Energized"/>
                        <span className="mdl-checkbox__label">Energized</span>
                    </label>

                  </fieldset>
                  <div className="mdl-textfield mdl-js-textfield">
                    <input
                    className="mdl-textfield__input"
                    type="textarea"
                    name="comment"
                    value={comment}
                    onChange={this.handleChange("comment")}
                    />
                    <label className="mdl-textfield__label" htmlFor="comment">Comment...</label>
                  </div>
                  <div className="mdl-card__actions mdl-card--border">
                    <button className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.props.getURL} type="submit">Check In</button>
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

export default CheckIn;
