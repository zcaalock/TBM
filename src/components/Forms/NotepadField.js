import React from 'react'
import { Field, reduxForm } from 'redux-form'


class SingleInput extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui floating error message">
          <div>{error}</div>
        </div>
      )
    }
  }


  renderImput = ({ input, meta }) => {    
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div style={this.props.propStyle} className={className}>        
        <textarea 
        placeholder="Enter name..." 
        autoFocus={true} 
        //style={this.props.propChildStyle} 
        style={{height: '350px', padding: '0px', backgroundColor: '#F5F5F5'}} 
        {...input} 
        autoComplete="off" />
        
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues)
  }

  Cancel = (event) =>{
    
    if(event.keyCode===27){
      this.props.removeEdit()
    }
  }

  render() {

    return (
      <form 
      //onBlur={()=>{this.props.removeEdit()}}
      onKeyDown={this.Cancel} 
      onSubmit={this.props.handleSubmit(this.onSubmit)} 
      onBlur={this.props.handleSubmit(this.onSubmit)} 
      className="ui form error">
        <Field name="content" component={this.renderImput} />        
      </form>
    )
  }
}

const validate = (formValues) => {
  const errors = {}

  if (!formValues.content) {
    errors.content = 'Please enter a content'
  }  
  return errors
}

export default reduxForm({
  form: 'singleInput',
  validate
})(SingleInput)



