import React, {Fragment, useState} from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../actions/auth.js";
import Alerts from "../layout/Alerts.js";


function Login(props){
    const [formData, setFormData] = useState({
        email:"",
        password:""
    });

    const {name, email, password, password2} = formData;

    const onChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const onSubmit = async e => {
        e.preventDefault();
        props.login({email, password});
        
    }

    //Redirect if logged in
    if(props.isAuthenticated){
        return <Redirect to="/dashboard" />
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i>Sign Into Your Account</p>
            <Alerts />
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onChange(e)}  required />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password} onChange={(e) => onChange(e)}  required
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);