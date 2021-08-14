import React from "react";
import {connect} from "react-redux";

const Alerts = (props) => {
    return (
        <div>
            {props.alerts.map(alert => <div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.msg}</div>)}
        </div>
    )
}


const mapStateToProps = (rootState) => {
    return {
        alerts: rootState.alert
    }
}

export default connect(mapStateToProps, null)(Alerts);

