import React, { useEffect, Fragment } from 'react';
import Alerts from "../layout/Alerts"
import DashboardAction from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import { setAuthToken } from "../../utils/setAuthToken.js";
import Spinner from "../layout/Spinner.jsx";

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {

    useEffect(() => {
        getCurrentProfile();
        if (localStorage.token) setAuthToken(localStorage.token);
    }, [getCurrentProfile])

    return (
        loading && profile === null ? <Spinner /> : <Fragment>
            <Alerts />
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead"><i class="fas fa-user"></i> Welcome {user && user.name}</p> 
            <DashboardAction />
            {profile !== null ? <Fragment>
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
            </Fragment> : <Fragment>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
            </Fragment>}
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentProfile: () => { dispatch(getCurrentProfile()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);