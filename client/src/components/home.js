import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Home extends Component {
render() {
      if(!this.props.loggedIn) {
        return (
        <div id="overview">
          <section className="section--center mdl-grid mdl-card mdl-shadow--2dp">
            <div className="mdl-card mdl-cell mdl-cell--12-col">
              <div className="mdl-card__supporting-text ">
                <h4 className="mdl-cell mdl-cell--12-col">Welcome to FitFeel</h4>
                <div className="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">
                  An app to check-in mentally before & after workouts to keep your mind just as fit as your body.
                </div>
              </div>
              <div className="mdl-card__actions">
                <button className="mdl-button"><Link to={'./about-ff'}>Learn More</Link></button>
              </div>
              <div className="mdl-card__actions">
                <button className="mdl-button"><Link to={'./sign-up'}>Sign Up</Link></button>
              </div>
            </div>
          </section>
          <section className="section--footer mdl-color--white mdl-grid">
              <div className="section__text mdl-cell mdl-cell--4-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">
                <h5 className="mdl-cell mdl-cell--12-col">Users</h5>
              </div>
              <div className="mdl-card__actions">
                <button className="mdl-button"><Link to={'./sign-in'}>Sign In</Link></button>
              </div>
          </section>
        </div>
      );
    }

    return <Redirect to={`/user/${this.props.username}`} />
  }
}

export default Home;
