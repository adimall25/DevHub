import React, {Fragment} from "react";
import Moment from "react-moment";

const ProfileExperience = ({experience: {
    company, 
    title,
    location,
    current,
    to,
    from,
    description
}}) => {
    return (
        <Fragment>
            <h3 className="text-dark">{company}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> - {to ? <Moment format="YYYY/MM/DD">{from}</Moment> : "Present"}
            </p>
            <p>
                <strong>Position : </strong> {title}
            </p>
            <p>
                <strong>Description : </strong> {description}
            </p>
        </Fragment>
    )
}


export default ProfileExperience;
