import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import Popup from 'reactjs-popup';
import axios from 'axios';

class CheckIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      exercise: '',
      feelings: [],
      comment: '',
      pre: null,
      userId: null,
      checked: false,
      messageFromServer: [],
      checkInError: false,
      inputInvalid: false
    }

    this.handleFeelingClick = this.handleFeelingClick.bind(this);
    this.resetError = this.resetError.bind(this)
  }

  componentDidMount() {
    this.setState({
      userId: this.props.location.state.userId
    })
  }


  handleChange = value => e => {
    this.setState({ [value]: e.target.value });
  }

  togglePre(value) {
    this.setState({ pre: value })
  }

  resetError() {
    this.setState({
      messageFromServer: [],
      showError: false,
      inputInvalid: false,
      checkInError: false
    });
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

    const { pre, title, exercise, feelings, comment, userId} = this.state;

    if (title === '' || exercise === '' || feelings.length === 0 || pre === null) {
      this.setState({
        showError: true,
        inputInvalid: true
      })
    } else {
      console.log(title);

      axios.post(`${url}/check-in`, {
        title,
        exercise,
        feelings,
        comment,
        pre,
        userId
      })
      .then((res) => {
        this.setState({
          messageFromServer: res.data.message,
          showError: false,
          checkInError: false,
          inputInvalid: false
        });
      })
      .catch((err) => {
        if (err.response.data) {
          this.setState({
            messageFromServer: err.response.data.message,
            showError: true,
            checkInError: true,
            inputInvalid: false
          })
        }
      })
    }
  }

  render() {
    const { title, exercise, comment, pre, checked, messageFromServer, showError, checkInError } = this.state;

    const formStyle = {
      selectBox: {
        minWidth: 150,
        marginBottom: 10,
      },
      textField: {
        width: 150
      },
      checkBox: {
        color: "rgb(255,140,0)"
      }
    }

    if (!messageFromServer[0] || showError) {
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
                    <fieldset>
                    <legend>Pre or Post Workout:</legend>
                      <Radio
                        name="pre-radio"
                        style={formStyle.checkBox}
                        checked={pre === true}
                        value={true}
                        onChange={() => this.togglePre(true)}
                      />Pre
                      <Radio
                        name="post-radio"
                        style={formStyle.checkBox}
                        checked={pre === false}
                        value={false}
                        onChange={() => this.togglePre(false)}
                      />Post
                    </fieldset>
                    <TextField
                      style={formStyle.textField}
                      label="Title *"
                      name="title"
                      value={title}
                      onChange={this.handleChange("title")}
                    />
                    <small> <br/>at least 4 characters, no special characters</small>
                  </div>
                  <fieldset>
                  <FormControl style={formStyle.selectBox}>
                    <InputLabel htmlFor="exercise">Excercise *</InputLabel>
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
                    <legend><b>I'm feeling *:</b></legend>
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
                    <button className="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect"
                    onClick={this.props.getURL}
                    type="submit">Check In</button>
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
                  checkInError ?
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


  return <Redirect to={`/user/${this.props.username}`} />

  }
}

export default CheckIn;
