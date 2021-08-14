import React, {Fragment, useEffect} from "react";
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import { getGithubRepos } from "../../actions/profile";


const ProfileGithub = ({username, getGithubRepos, repos}) => {
    useEffect(() => {
        getGithubRepos(username);
    }, [])
    return (
        <Fragment>
        asdasdasds
            <div className="profile-github">
                <h2 className="text-primary my-1">Github Repos</h2>
                {repos === null ? <Spinner /> : <Fragment>
                    {repos.map(repo => (
                        <div key={repo._id} className="repo bg-white p-1 my-1">
                            <div>
                                <h4>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                                </h4>
                                <p>{repo.description}</p>
                            </div>
                            <div>
                                <ul>
                                    <li className="badge badge-primary">Stars : {repo.stargazers_count}</li>
                                    <li className="badge badge-dark">Watchers : {repo.watchers_count}</li>
                                    <li className="badge badge-light">Forks : {repo.forks_count}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </Fragment>}
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        repos: state.profile.repos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGithubRepos : (username) => dispatch(getGithubRepos(username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileGithub);