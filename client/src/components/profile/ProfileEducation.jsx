import React, {Fragment} from "react";
import Moment from "react-moment";

const ProfileEducation = ({education: {
    school,
    degree,
    fieldOfStudy, 
    current,
    to,
    from,
    description
}}) => {
    return (
        <Fragment>
            <h3 className="text-dark">{school}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> - {to ? <Moment format="YYYY/MM/DD">{from}</Moment> : "Present"}
            </p>
            <p>
                <strong>Degree : </strong> {degree}
            </p>
            <p>
                <strong>Field of Study : </strong> {fieldOfStudy}
            </p>
            <p>
                <strong>Description : </strong> {description}
            </p>
        </Fragment>
    )
}


export default ProfileEducation;
