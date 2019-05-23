import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return(
      <>
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">FitFeel</span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation">
            {
              this.props.loggedIn ?
              <><Link to="/user/:slug" className="mdl-navigation__link">Home</Link>
              <Link to="/sign-out" className="mdl-navigation__link" onClick={(e) => this.props.logout(e)}>Sign Out</Link></> :
              <><Link to="/" className="mdl-navigation__link">Home</Link>
              <Link to="/about-ff" className="mdl-navigation__link">About FitFeel</Link>
              <Link to="/sign-up" className="mdl-navigation__link">Sign Up</Link>
              <Link to="/sign-in" className="mdl-navigation__link">Sign In</Link></>
            }
          </nav>
        </div>
    </>
    )
  }
}

export default Navbar;
