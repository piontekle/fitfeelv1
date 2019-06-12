import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

class CheckIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      exercise: '',
      feelings: [],
      comment: '',
      userId: this.props.userId,
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
    this.setState({ checked: e.target.checked });

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

    const { title, exercise, feelings, comment, userId } = this.state;

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
        comment,
        userId
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

    const formStyle = {
      selectBox: {
        minWidth: 150,
        marginBottom: 10,
      },
      textField: {
        width: 150
      },
      checkBox: {
        color: "orange"
      }
    }

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
                    <TextField
                      style={formStyle.textField}
                      label="Title"
                      name="title"
                      value={title}
                      onChange={this.handleChange("title")}
                    />
                  </div>
                  <fieldset>
                  <FormControl style={formStyle.selectBox}>
                    <InputLabel htmlFor="exercise">Excercise</InputLabel>
                    <Select
                      value={exercise}
                      onChange={this.handleChange("exercise")}
                    >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="Bike">Bike</MenuItem>
                    <MenuItem value="Hike">Hike</MenuItem>
                    <MenuItem value="Interval">Interval</MenuItem>
                    <MenuItem value="Meditation">Meditation</MenuItem>
                    <MenuItem value="Run">Run</MenuItem>
                    <MenuItem value="Swim">Swim</MenuItem>
                    <MenuItem value="Walk">Walk</MenuItem>
                    <MenuItem value="Weights">Weights</MenuItem>
                    <MenuItem value="Yoga">Yoga</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  </fieldset>
                  <fieldset>
                    <legend><b>I'm feeling:</b></legend>
                    <Checkbox
                      style={formStyle.checkBox}
                      name="feelings[]"
                      className="mdl-checkbox__input"
                      defaultChecked={checked}
                      onChange={this.handleFeelingClick}
                      value="Energized"
                    />
                    <span className="mdl-checkbox__label">Energized</span>
                    <Checkbox
                      style={formStyle.checkBox}
                      name="feelings[]"
                      className="mdl-checkbox__input"
                      defaultChecked={checked}
                      onChange={this.handleFeelingClick}
                      value="Happy"
                    />
                    <span className="mdl-checkbox__label">Happy</span><br/>
                    <Checkbox
                      style={formStyle.checkBox}
                      name="feelings[]"
                      className="mdl-checkbox__input"
                      defaultChecked={checked}
                      onChange={this.handleFeelingClick}
                      value="Slow"
                    />
                    <span className="mdl-checkbox__label">Slow</span>
                    <Checkbox
                      style={formStyle.checkBox}
                      name="feelings[]"
                      className="mdl-checkbox__input"
                      defaultChecked={checked}
                      onChange={this.handleFeelingClick}
                      value="Meh"
                    />
                    <span className="mdl-checkbox__label">Meh</span><br/>
                    <Checkbox
                      style={formStyle.checkBox}
                      name="feelings[]"
                      className="mdl-checkbox__input"
                      defaultChecked={checked}
                      onChange={this.handleFeelingClick}
                      value="Sad"
                    />
                    <span className="mdl-checkbox__label">Sad</span>
                    <Checkbox
                      style={formStyle.checkBox}
                      name="feelings[]"
                      className="mdl-checkbox__input"
                      defaultChecked={checked}
                      onChange={this.handleFeelingClick}
                      value="Tired"
                    />
                    <span className="mdl-checkbox__label">Tired</span><br/>
                  </fieldset>
                  <div className="mdl-textfield mdl-js-textfield">
                    <TextField
                      label="Comment..."
                      name="comment"
                      value={comment}
                      onChange={this.handleChange("comment")}
                      fullWidth
                    />
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


  return <Redirect to={`/user/${this.props.username}`} />

  }
}

export default CheckIn;
