import React from 'react'
import { Field, reduxForm } from 'redux-form'


class SingleInput extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui floating error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }


  renderImput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues)
  }

  render() {

    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field className="ui small input" name="title" component={this.renderImput} />
      </form>
    )
  }
}

const validate = (formValues) => {
  const errors = {}

  if (!formValues.title) {
    errors.title = 'Please enter a title'
  }  
  return errors
}

export default reduxForm({
  form: 'singleInput',
  validate
})(SingleInput)



