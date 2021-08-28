import React from "react";
import {Link, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";

function Landing(props){
    
    return <section className="landing">
    {props.isAuthenticated && <Redirect to="/dashboard" />}
    <div className="dark-overlay">
      <div className="landing-inner">
        <h1 className="x-large">Developer Hub</h1>
        <p className="lead">
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </p>
        <div className="buttons">
          <Link to="/register">
            <span className="btn btn-primary">Sign Up</span>
          </Link>
          <Link to="/login">
            <span className="btn btn-light">Login</span>
          </Link>
          {/* <a href="register.html" className="btn btn-primary">Sign Up</a>
          <a href="login.html" className="btn btn-light">Login</a> */}
        </div>
      </div>
    </div>
  </section>
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
};

export default withRouter(connect(mapStateToProps, null)(Landing));