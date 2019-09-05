import React, { Component } from 'react';
import brain from '../images/strongbrain.jpg';
import feelForm from '../images/feelform.png';

class About extends Component {

  render() {

    return (
      <section id="about-ff">
      <section id="about" className="mdl-grid">
          <div className="mdl-cell mdl-cell--8-col">
            <h1 id="about-h">About FitFeel</h1>
            <p>Obviously taking care of yourself physically is important to you, but are you keeping yourself mentally fit as well?  With FitFeel, you can "check-in" with yourself before and after workouts. Did you sleep well? Are deadlines coming up? Are you excited for the concert next week? Take a minute to think about where you are mentally before starting a workout and how you're feeling after.</p>
            <p>
              <img src={brain} alt="strong-brain" /><br/ >
              <small>source: https://www.myvmc.com/health/brain-health/</small>

            </p>
          </div>
        </section>
        <section id="how" className="mdl-grid">
          <div className="mdl-cell mdl-cell--8-col">
            <h4 id="how-to-h">How?</h4>
            <p>Before each workout, open FitFeel to answer a few quick questions about where you are mentally. You can simply check the boxes or elaborate - you can put as much time as you want or have into it. <img src={feelForm} id="feelFormImg" alt="check-in-form" /></p>
            <p>Then after your workout, check-in again to see how things have changed.</p>
          </div>
        </section>
      </section>
    );
  }
}

export default About;
