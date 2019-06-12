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
      feelings: '',
      comment: ''
    }
  }

  async componentDidMount() {
    let url=this.props.url;

    await axios.get(`${url}/get-check-in`, {
      params: {title: this.props.match.params.title}
    })
    .then((res) => {
      let feelings = this.formatFeelings(res.data.feelings);

      this.setState({
        title: res.data.title,
        exercise: res.data.exercise,
        feelings: feelings,
        comment: res.data.comment
      });
    })
    .catch((err) => {
      console.log(err)
      this.setState({
        error: true
      })
    });
  }

formatFeelings(feelings) {
  if (feelings.length === 1) return feelings;

  return feelings.slice(0, feelings.length - 1).join(", ") + ", and " + feelings.slice(-1);
}

  render() {
    const { title, exercise, feelings, comment } = this.state;

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
            <p>I felt: {feelings}</p>
            {
              comment ? <p>{comment}</p> : <p>No extras today!</p>
            }
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default ShowCheckIn;
