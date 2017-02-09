import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';
import _ from 'lodash';

const FIELDS = {
    title: {
        type: 'input',
        label: 'Title for post'
    },
    categories: {
        type: 'input',
        label: 'Enter some categories for this post'
    },
    content: {
        type: 'textarea',
        label: 'Post content'
    }
}

class PostsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        this.props.createPost(props)
            .then(() => {
                this.context.router.push('/');
            });
    }

    renderField(fieldConfig, field) {
        const fieldHelper = this.props.fields[field];
        
        return (
            <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`} key={fieldConfig.label}>
                <label>{fieldConfig.label}</label>
                <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
                
                <div className="text-help">
                    {fieldHelper.touched ? fieldHelper.error : ''}
                </div>
            </div>
        );
    }

    render() {
        const { fields: {title, categories, content}, handleSubmit } = this.props; // const handleSubmit = this.props.handleSubmit
        
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Post</h3>
                
                {_.map(FIELDS, this.renderField.bind(this))}

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">
                    Cancel
                </Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    _.each(FIELDS, (type, field) => {
        if (!values[field]) {
            errors[field] = `Enter the ${field}`;
        }
    });

    return errors;
}

// connect: 1st argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
    form: 'PostsNewForm',
    fields: _.keys(FIELDS),
    validate
}, null, { createPost })(PostsNew);

// What's going on behind the scenes?

// User types something in, record it on application state 

/*
state === {
    form: {
        PostsNewForm: {
            title: '...',
            categories: '...',
            content: '...'
        }
    }
}
*/