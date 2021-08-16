import React, {Fragment, useState, useEffect} from "react";
import {connect} from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({addPost}) => {

    const [text, setText] = useState('');
    return (
        <Fragment>
            <div class="post-form">
                <div class="bg-primary p">
                <h3>Say Something...</h3>
                </div>
                <form class="form my-1" onSubmit={e => {
                    e.preventDefault();
                    addPost({text, title:'Post title'});
                    setText('');
                }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                ></textarea>
                <input type="submit" class="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (formData) => dispatch(addPost(formData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostForm);