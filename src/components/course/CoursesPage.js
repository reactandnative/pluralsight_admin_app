import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
    // In the constructor we initialize state and call our bind functions
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: { title:"" }
        };
        // Do your bindings in the constructor, not the render!
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    // Our child functions which are called by render ************
    onTitleChange(event) {
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({course: course });
    }

    onClickSave() {
        this.props.actions.createCourse(this.state.course);
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>
    }
    // **********************************************************

    // For simplicity the markup is inline, usually we would call
    // child function with the markup
    render() {
        return (
            <div>
                <h1>Courses</h1>
                {this.props.courses.map(this.courseRow)}
                <h2>Add Course</h2>
                <input
                    type="text"
                    onChange={this.onTitleChange}
                    value={this.state.course.title} />

                <input
                    type="submit"
                    value="Save"
                    onClick={this.onClickSave} />
            </div>
        );
    }
}

// Proptypes that provide our proptype validation
CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// Our redux connect and related functions ******************
function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

// Exporting a component decorated by the react-redux connect function
// The connect function is what we use to create components (container-components) that can interact with redux
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
// **********************************************************
