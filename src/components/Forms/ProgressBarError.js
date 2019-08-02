import React, { Component } from 'react'
import {Progress } from 'semantic-ui-react'

export default class ProgressExampleIndicating extends Component {
   

  render() {
    return (
      <div>
        <Progress className={this.props.size} style={{margin: '0'}} percent={this.props.value} color={this.props.color}/>        
      </div>
    )
  }
}