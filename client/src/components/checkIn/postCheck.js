import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Slider from '@material-ui/core/Slider';
import Popup from 'reactjs-popup';
import axios from 'axios';

class PostCheck extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      messageFromServer: [],
      checkInError: false
    }
  }

  async componentDidMount() {
    let url=this.props.url;

    await axios.get(`${url}/get-check-in`, {
      params: {id: this.props.match.params.id}
    })
    .then((res) => {
      this.setState({
        title: res.data.title,
        exercise: res.data.exercise,
        feelings: res.data.preCheck[0]
      });
    })
    .catch((err) => {
      console.log(err)
      this.setState({
        messageFromServer: err,
        showError: true
      })
    });
  }

  handleChange = value => e => {
    this.setState({ [value]: e.target.value });
  }

  handleFeelingSlide = feeling => (event, value) => {
    let feelings = this.state.feelings;

    feelings[feeling] = value;


    this.setState({ feelings: feelings });
  }

  postCheckIn(e) {
    e.preventDefault();
    let url = this.props.url;
    let checkInId = this.props.match.params.id

    const { feelings, comment } = this.state;

    axios.post(`${url}/post-check-in`, {
      data: { feelings, comment },
      query: { checkInId }
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
          messageFromServer: err.response.data.message || err.response.data.name,
          showError: true,
          checkInError: true
        })
      }
    })
  }

  render() {
    const { title, exercise, comment, messageFromServer, showError, checkInError } = this.state;

    const formStyle = {
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
                <h2 className="mdl-card__title-text">Post Check In</h2>
              </div>
              <div className="mdl-card__supporting-text">
                <form id="checkInForm" onSubmit={ (e) => this.postCheckIn(e)}>
                  <div className="mdl-textfield mdl-js-textfield">
                    <TextField
                      id="title-post"
                      label="Title"
                      disabled
                      style={formStyle.textField}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">{title}</InputAdornment>,
                      }}
                    />
                  </div>
                  <fieldset id="exercise-select">
                  <TextField
                    id="exercise-post"
                    label="Exercise"
                    disabled
                    style={formStyle.textField}
                    defaultValue={exercise}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{exercise}</InputAdornment>,
                    }}
                  />
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
                    type="submit">Add to Check In</button>
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

export default PostCheck;
