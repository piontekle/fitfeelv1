import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

  render() {

    return(
      <div>
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">FitFeel</span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation mdl-layout--large-screen-only">
            <Link to="/" className="mdl-navigation__link">Home</Link>
            <Link to="/about-ff" className="mdl-navigation__link">About FitFeel</Link>
            <Link to="/sign-up" className="mdl-navigation__link">Sign Up</Link>
            <Link to="/sign-in" className="mdl-navigation__link">Sign In</Link>
          </nav>
        </div>
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">FitFeel</span>
        <nav className="mdl-navigation">
          <Link to="/" className="mdl-navigation__link">Home</Link>
          <Link to="/about-ff" className="mdl-navigation__link">About FitFeel</Link>
          {
            this.props.loggedIn ? (<Link to="/sign-out" className="mdl-navigation__link">Sign In</Link>) :
            (<div><Link to="/sign-up" className="mdl-navigation__link">Sign Up</Link>
            <Link to="/sign-in" className="mdl-navigation__link">Sign In</Link></div>)
          }
        </nav>
      </div>
    </div>
    )
  }
}

export default Navbar;
