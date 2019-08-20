import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
        minHeight: 450,
        maxHeight: 500,
        alignment: "center"
      },
      title: {
        minHeight: 60
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
                <p>Exercise: {exercise}</p>
                <p>I felt: {
                    preCheck[0] && Object.keys(preCheck[0]).map((feeling) =>
                      <li key={feeling}>{feeling}: {preCheck[0][feeling]}</li>
                    )
                  }
                </p>
                {
                  preCheck[1] ? <p>{preCheck[1]}</p> : <p>No extras today!</p>
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
                <p>Exercise: {exercise}</p>
                <p>I felt: {
                    postCheck[0] && Object.keys(postCheck[0]).map((feeling) =>
                      <li key={feeling}>{feeling}: {postCheck[0][feeling]}</li>
                    )
                  }
                </p>
                {
                  postCheck[1] ? <p>{postCheck[1]}</p> : <p>No extras today!</p>
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
