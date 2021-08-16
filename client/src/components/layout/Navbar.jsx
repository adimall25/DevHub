import React from "react";
import {Link} from "react-router-dom";
import { withRouter, useHistory } from "react-router";
import {connect} from "react-redux";
import {logout} from "../../actions/auth.js";

const Navbar = ({auth: {isAuthenticated, loading}, logout})=>{
    const history = useHistory();
    const authLinks = (
        <ul>
            <li>
                <Link to="/profiles">
                    Developers
                </Link>
            </li>
            <li>
                <Link to="/posts">
                    Posts
                </Link>
            </li>
            <li> 
                <Link to="/dashboard">
                    <i className="fas fa-user" />{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={() => logout(history)}>
                <i className="fas fa-sign-out-alt" />{' '}
                <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li>
                <Link to="/profiles">
                    Developers
                </Link>
            </li>
            <li>
                <Link to="/register">
                    Register
                </Link>
            </li>
            <li>
                <Link to="/login">
                    Login
                </Link>
            </li>
               
                
                
        </ul>
        
    )
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> DevConnector
                </Link>  
            </h1>
            {!loading && isAuthenticated ? authLinks : guestLinks}
            
        </nav>
       
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {    
        logout: (history) => dispatch(logout(history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));