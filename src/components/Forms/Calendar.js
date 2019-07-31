import React from 'react'
import {DateInput} from 'semantic-ui-calendar-react'
import {Form} from 'semantic-ui-react'

class Calendar extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      date: this.props.value,
      time: '',
      dateTime: '',
      datesRange: ''
    };
  }
 
  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
      this.props.readData(value)
    }
  }
 
  read(){
    console.log('data: ', this.state.date)
  }
  render() {
    //console.log('date: ', this.state.date)
    return (
      <Form>
        <DateInput
        clearable
        closable
          name="date"
          placeholder="Date"
          value={this.state.date}
          iconPosition="left"
          onChange={this.handleChange}
          dateFormat={'YYYY-MM-DD'}
        />        
      </Form>
    );
  }
}

export default Calendar