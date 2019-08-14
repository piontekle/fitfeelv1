import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Popup from 'reactjs-popup';
import axios from 'axios';

class CheckIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      title: '',
      exercise: '',
      feelings: {
        Energized: 0,
        Happy: 0,
        Meh: 0,
        Sad: 0,
        Tired: 0
      },
      comment: '',
      userId: this.props.userId,
      messageFromServer: [],
      checkInError: false,
      inputInvalid: false
    }

    this.handleFeelingSlide = this.handleFeelingSlide.bind(this);
    this.resetError = this.resetError.bind(this)
  }

  componentDidMount() {
    this.setState({
      url: this.props.url,
      userId: this.props.userId
    })
  }


  handleChange = value => e => {
    this.setState({ [value]: e.target.value });
  }

  handleFeelingSlide = feeling => (event, value) => {
    let feelings = this.state.feelings;

    feelings[feeling] = value;


    this.setState({ feelings: feelings });
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

  checkIn(e) {
    e.preventDefault();
    let url = this.state.url;

    const { title, exercise, feelings, comment, userId} = this.state;

    if (title === '' || exercise === '') {
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
          checkInError: false,
          inputInvalid: false
        });
      })
      .catch((err) => {
        if (err.response.data) {
          console.log(err.response.data.message);
          this.setState({
            messageFromServer: err.response.data.message || err.response.data.name,
            showError: true,
            checkInError: true,
            inputInvalid: false
          })
        }
      })
    }
  }

  render() {
    const { title, exercise, comment, messageFromServer, showError, checkInError } = this.state;

    const formStyle = {
      selectBox: {
        minWidth: 150,
        marginBottom: 10,
      },
      textField: {
        width: 150
      },
      slider: {
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
                    <TextField
                      id="title-input"
                      style={formStyle.textField}
                      label="Title *"
                      name="title"
                      value={title}
                      onChange={this.handleChange("title")}
                    />
                    <small> <br/>at least 4 characters, no special characters</small>
                  </div>
                  <fieldset id="exercise-select">
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
                  <fieldset id="feelings-select">
                    <legend><b>I'm feeling *:</b></legend>
                    Energized
                    <Slider
                      style={formStyle.slider}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      value={this.state.feelings["Energized"]}
                      onChange={this.handleFeelingSlide("Energized")}
                      step={1}
                      marks
                      min={0}
                      max={5}
                    />
                    Happy
                    <Slider
                      style={formStyle.slider}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      value={this.state.feelings["Happy"]}
                      onChange={this.handleFeelingSlide("Happy")}
                      step={1}
                      marks
                      min={0}
                      max={5}
                    />
                    Meh
                    <Slider
                      style={formStyle.slider}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      value={this.state.feelings["Meh"]}
                      onChange={this.handleFeelingSlide("Meh")}
                      step={1}
                      marks
                      min={0}
                      max={5}
                    />
                    Tired
                    <Slider
                      style={formStyle.slider}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      value={this.state.feelings["Tired"]}
                      onChange={this.handleFeelingSlide("Tired")}
                      step={1}
                      marks
                      min={0}
                      max={5}
                    />
                    Sad
                    <Slider
                      style={formStyle.slider}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      value={this.state.feelings["Sad"]}
                      onChange={this.handleFeelingSlide("Sad")}
                      step={1}
                      marks
                      min={0}
                      max={5}
                    />
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
