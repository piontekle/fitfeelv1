import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="home-header">Welcome to Fit Feel</h1>
        <p id="intro-p">An app to check-in mentally before & after workouts to keep your mind just as fit as your body</p>
        <Link to={'./about-ff'}>
          <button variant="raised">Learn More</button>
        </Link>
      </div>
    );
  }
}

export default Home;
