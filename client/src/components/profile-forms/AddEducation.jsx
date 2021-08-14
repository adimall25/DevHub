import react, { Fragment, useState } from "react";
import {connect} from "react-redux";
import {withRouter, useHistory} from "react-router";
import { Link } from "react-router-dom";
import { addEducation } from "../../actions/profile";


const AddEducation = ({addEducation}) => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldOfStudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {school, degree, fieldOfStudy, from, to, current, description} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    return (
        <Fragment>
            <h1 class="large text-primary">
            Add An Education
            </h1>
            <p class="lead">
                <i class="fas fa-code-branch"></i> Add any school or bootcamp that you have attended
            </p>
            <small>* = required field</small>
            <form class="form" onSubmit={(e) => {
                e.preventDefault();
                addEducation(formData, history);
            }}>
                <div class="form-group">
                <input type="text" placeholder="* School or Bootcamp" name="school" value={school} onChange={(e) => onChange(e)} required />
                </div>
                <div class="form-group">
                <input type="text" placeholder="* Degree or certificate" name="degree" value={degree} onChange={(e) => onChange(e)} required />
                </div>
                <div class="form-group">
                <input type="text" placeholder="Field of Study" name="fieldOfStudy" value={fieldOfStudy} onChange={(e) => onChange(e)} />
                </div>
                <div class="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={(e) => onChange(e)} />
                </div>
                <div class="form-group">
                <p><input type="checkbox" name="current" checked={current} value={current} onChange={(e) => {
                    setFormData({...formData, current: !current}); 
                    toggleDisabled(!toDateDisabled);
                }}  /> Currently Studying </p>
                </div>
                <div class="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value={to} onChange={(e) => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''}/>
                </div>
                <div class="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Program Description"
                    value={description} onChange={(e) => onChange(e)} 
                ></textarea>
                </div>
                <input type="submit" class="btn btn-primary my-1" />
                <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {

    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addEducation : (formData, history) => dispatch(addEducation(formData, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEducation));