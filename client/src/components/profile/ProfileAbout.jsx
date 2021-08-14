import React from "react";
import { Fragment } from "react";

const ProfileAbout = ({profile: {
    bio,
    skills,
    user:{
        name 
    }
}}) => {
    return (
        <Fragment>
            <div class="profile-about bg-light p-2">
                {bio && <Fragment>
                    <h2 class="text-primary">{name.trim().split()[0]}'s Bio</h2>
                    <p>
                        {bio}
                    </p>
                </Fragment>}
                <div class="line"></div>
                <h2 class="text-primary">Skill Set</h2>
                <div class="skills">
                    {skills && skills.map((skill, index) => {
                        return (
                            <Fragment>
                                <div className="p-1"></div>
                                <i className="fas fa-check"></i>{' '}{` ${skill}`}
                            </Fragment>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    )
}

export default ProfileAbout;