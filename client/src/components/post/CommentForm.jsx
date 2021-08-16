import React, {Fragment, useState} from "react";
import {connect} from "react-redux";
import { addComment } from "../../actions/post";


const CommentForm = ({postId, addComment}) => {
    const [text, setText] = useState('');
    return (
        <Fragment>
            <div class="post-form">
                <div class="bg-primary p">
                <h3>Leave a Comment</h3>
                </div>
                <form class="form my-1" onSubmit={e => {
                    e.preventDefault();
                    addComment(postId, {text});
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

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (postId, formData) => dispatch(addComment(postId, formData))
    }
}
export default connect(null, mapDispatchToProps)(CommentForm);