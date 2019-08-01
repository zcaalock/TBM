import React from 'react';
import { differenceInCalendarDays } from 'date-fns'
import ProgressBar from '../../../../Forms/ProgressBarError'





export default class DaysToDeadline extends React.Component {

  countPercent() {
    var createdAt = this.props.pulse.createdAt.split('T')[0]
    var daysToDeadline = differenceInCalendarDays(
      new Date(this.props.pulse.deadline),
      new Date()

    )  


    var daysFromCreateToDeadline = differenceInCalendarDays(
      new Date(this.props.pulse.deadline),
      new Date(createdAt)

    )

    if (daysToDeadline && daysToDeadline > 0) return  ( daysFromCreateToDeadline - daysToDeadline)/daysFromCreateToDeadline
    return null
  }

  fixedPercentValues(){
    var daysToDeadline = differenceInCalendarDays(
      new Date(this.props.pulse.deadline),
      new Date()

    )  

    if(daysToDeadline < 1 ) return 0.1
    if( daysToDeadline <= 2) return 0.9
    if( daysToDeadline <= 3) return 0.8
    if( daysToDeadline <= 5) return 0.7
    if( daysToDeadline <= 7) return 0.6
    if( daysToDeadline <= 10) return 0.4
    if( daysToDeadline <= 15) return 0.3
    if( daysToDeadline <= 20) return 0.2
    if( daysToDeadline <= 25) return 0.1
    if( daysToDeadline > 25) return 0

  }



  render() {

    if(this.props.pulse.deadline)
    return (
      //<div></div>
       <ProgressBar size={'tiny'} value={this.fixedPercentValues()*100}/>
    )

    return(<div style={{display: 'none'}}></div>)

  }
}