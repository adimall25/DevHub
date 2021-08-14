import React from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({component: Component, auth: {isAuthenticated, loading}, ...rest}) => {
    return (
        <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to='/login'></Redirect>) : (<Component {...props}></Component>)}></Route>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(PrivateRoute);