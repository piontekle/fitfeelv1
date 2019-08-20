import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Slider from '@material-ui/core/Slider';
import axios from 'axios';

class ShowCheckIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      exercise: '',
      preCheck: [],
      postCheck: []
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
        preCheck: res.data.preCheck,
        postCheck: res.data.postCheck
      });
    })
    .catch((err) => {
      console.log(err)
      this.setState({
        error: true
      })
    });
  }

  render() {
    const { title, exercise, preCheck, postCheck } = this.state;

    const checkInStyle = {
      card: {
        margin: "auto",
        maxWidth: 300,
        minHeight: 700,
        maxHeight: 700,
        alignment: "center"
      },
      title: {
        minHeight: 60
      },
      slider: {
        color: "rgb(255,140,0)"
      }
    }

    return (
      <div>
        <button className="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect"
        onClick={this.props.history.goBack}>
          Back to Profile
        </button>
        <section id="check-in-display" className="mdl-grid">
          <div className="mdl-cell mdl-cell--5-col">
            <Card style={checkInStyle.card}>
              <div className="mdl-card__title mdl-color--primary mdl-color-text--white" style={checkInStyle.title}>
                <h2 className="mdl-card__title-text">{title}</h2>
              </div>
              <h6>Pre Workout</h6>
              <CardContent>
                <p><b>Exercise:</b> {exercise}</p>
                <p> <b>I felt:</b> </p>
                <p>{
                    preCheck[0] && Object.keys(preCheck[0]).map((feeling) =>
                    <>
                    {feeling}:
                      <Slider
                        style={checkInStyle.slider}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        value={preCheck[0][feeling]}
                        disabled
                        step={1}
                        marks
                        min={0}
                        max={5}
                      />
                    </>
                    )
                  }
                </p>
                {
                  preCheck[1] ? <p><b>Comments: </b>{preCheck[1]}</p> : <p>No extras today!</p>
                }
              </CardContent>
            </Card>
          </div>
          <div className="mdl-cell mdl-cell--5-col">
            <Card style={checkInStyle.card}>
            <div className="mdl-card__title mdl-color--primary mdl-color-text--white" style={checkInStyle.title}>
            </div>
              <h6>Post Workout</h6>
              <CardContent>
              { postCheck ?
              <>
                <div></div>
                <p><b> I felt: </b></p>
                  <p>{
                      postCheck[0] && Object.keys(postCheck[0]).map((feeling) =>
                        <>
                        {feeling}:
                          <Slider
                            style={checkInStyle.slider}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            value={postCheck[0][feeling]}
                            disabled
                            step={1}
                            marks
                            min={0}
                            max={5}
                          />
                        </>
                      )
                    }
                  </p>
                  {
                    postCheck[1] ? <p><b>Comments: </b>{postCheck[1]}</p> : <p>No extras today!</p>
                  }
                </> :
                <p>No post check in yet!</p>
              }
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    )
  }
}

export default ShowCheckIn;
