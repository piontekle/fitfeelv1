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
      params: {title: this.props.match.params.title}
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
    const { title, exercise, preCheck } = this.state;

    const checkInStyle = {
      card: {
        margin: "auto",
        maxWidth: 300,
        alignment: "center"
      }
    }

    return (
      <div>
        <Card style={checkInStyle.card}>
          <button className="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect"
          onClick={this.props.history.goBack}>
            Back to Profile
          </button>
          <h2>{title}</h2>
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
    )
  }
}

export default ShowCheckIn;
