import React from "react";
import { Fragment } from "react";

const ProfileTop = ({profile: {
    status,
    company,
    location,
    website,
    social,
    user:{
        name,
        avatar
    }
}}) => {
    return (
        <Fragment>
            <div class="profile-top bg-primary p-2">
                <img
                    class="round-img my-1"
                    src={avatar}
                    alt=""
                />
                <h1 class="large">{name}</h1>
                <p class="lead">{status} {company && <span>at {company}</span>}</p>
                <p>{location && <span>{location}</span>}</p>
                <div class="icons my-1">
                {
                    website && (
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-globe fa-2x"></i>
                        </a>
                    )
                }
                {
                    social && social.twitter && (
                        <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-globe fa-2x"></i>
                        </a>
                    )
                }
                {
                    social && social.facebook && (
                        <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-globe fa-2x"></i>
                        </a>
                    )
                }
                {
                    social && social.youtube && (
                        <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-globe fa-2x"></i>
                        </a>
                    )
                }
                {
                    social && social.instagram && (
                        <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-globe fa-2x"></i>
                        </a>
                    )
                }
                </div>
            </div>
        </Fragment>
    )
}

export default ProfileTop;