import React, {Fragment, useState} from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert.js";
import {register} from "../../actions/auth.js";
import Alerts from "../layout/Alerts.js";



function Register(props){
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        password2:""
    });

    const {name, email, password, password2} = formData;

    const onChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2){
            console.log("Yo")
            props.setAlert("Passwords don't match", "danger");
            console.log("Dispatched");
        }
        else{
            props.register({name, email, password});
        }
    }

    if(props.isAuthenticated){
        return <Redirect to="/dashboard" />
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <Alerts />
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="Name" value={name} onChange={(e) => onChange(e)} name="name" required />
                </div>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onChange(e)}  required />
                <small className="form-text">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email</small>
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
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2} onChange={(e) => onChange(e)}  required
                    minLength="6"
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
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
        setAlert : (msg, alertType) => {
            dispatch(setAlert(msg, alertType));
        },
        register : ({name, email, password}) => {
            dispatch(register({name, email, password}));
        }
    }
}

export default connect(null, mapDispatchToProps)(Register); //We can also directly put setAlert instead of mapDisptachToProps 