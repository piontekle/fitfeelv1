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

    this.handleFeelingClick = this.handleFeelingClick.bind(this);
  }

  handleChange = value => e => {
    this.setState({ [value]: e.target.value });
  }

  handleFeelingClick(e) {
    let feelings = this.state.feelings || [];

    if(e.target.checked) {
      feelings.push(e.target.value);
    } else {
      let i = feelings.indexOf(e.target.value);
      feelings.splice(i, 1);
    }

    this.setState({ feelings: feelings })
  }

  checkIn(e) {
    e.preventDefault();
    let url = this.props.url;

    const { title, exercise, feelings, comment } = this.state;

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
    const { title, exercise, comment, checked, messageFromServer } = this.state;

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
                  <div className="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
                    <label className="mdl-selectfield__label" htmlFor="exercise">Exercise
                    <i className="mdl-icon-toggle__label material-icons">keyboard_arrow_down</i>
                      <select className="mdl-selectfield__input" name="exercise" id="exercise" value={exercise} onChange={this.handleChange("exercise")}>
                        <option className="mdl-menu__item" value="Bike">Bike</option>
                        <option className="mdl-menu__item" value="Hike">Hike</option>
                        <option className="mdl-menu__item" value="Interval">Interval</option>
                        <option className="mdl-menu__item" value="Meditation">Meditation</option>
                        <option className="mdl-menu__item" value="Run">Run</option>
                        <option className="mdl-menu__item" value="Swim">Swim</option>
                        <option className="mdl-menu__item" value="Walk">Walk</option>
                        <option className="mdl-menu__item" value="Weights">Weights</option>
                        <option className="mdl-menu__item" value="Yoga">Yoga</option>
                        <option className="mdl-menu__item" value="Other">Other</option>
                      </select>
                    </label>
                  </div>
                  <fieldset>
                    <legend><b>I'm feeling:</b></legend>
                    <input
                    type="checkbox"
                    name="feelings[]"
                    className="mdl-checkbox__input"
                    defaultChecked={checked}
                    onChange={this.handleFeelingClick}
                    value="Energized"/>
                    <span className="mdl-checkbox__label"> Energized </span>
                    <input
                    type="checkbox"
                    name="feelings[]"
                    className="mdl-checkbox__input"
                    defaultChecked={checked}
                    onChange={this.handleFeelingClick}
                    value="Happy"/>
                    <span className="mdl-checkbox__label"> Happy </span><br/>
                    <input
                    type="checkbox"
                    name="feelings[]"
                    className="mdl-checkbox__input"
                    defaultChecked={checked}
                    onChange={this.handleFeelingClick}
                    value="Slow"/>
                    <span className="mdl-checkbox__label"> Slow </span>
                    <input
                    type="checkbox"
                    name="feelings[]"
                    className="mdl-checkbox__input"
                    defaultChecked={checked}
                    onChange={this.handleFeelingClick}
                    value="Meh"/>
                    <span className="mdl-checkbox__label"> Meh </span><br/>
                    <input
                    type="checkbox"
                    name="feelings[]"
                    className="mdl-checkbox__input"
                    defaultChecked={checked}
                    onChange={this.handleFeelingClick}
                    value="Sad"/>
                    <span className="mdl-checkbox__label"> Sad </span>
                    <input
                    type="checkbox"
                    name="feelings[]"
                    className="mdl-checkbox__input"
                    defaultChecked={checked}
                    onChange={this.handleFeelingClick}
                    value="Tired"/>
                    <span className="mdl-checkbox__label"> Tired </span><br/>
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
