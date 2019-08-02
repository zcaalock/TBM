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
    
    if(daysToDeadline < 1 ) return <ProgressBar size={'tiny'} value={100} color='red'/>
    if( daysToDeadline <= 2) return <ProgressBar size={'tiny'} value={90} color='orange'/>
    if( daysToDeadline <= 3) return <ProgressBar size={'tiny'} value={80} color='orange'/>
    if( daysToDeadline <= 5) return <ProgressBar size={'tiny'} value={70} color='yellow'/>
    if( daysToDeadline <= 7) return <ProgressBar size={'tiny'} value={60} color='olive'/>
    if( daysToDeadline <= 10) return <ProgressBar size={'tiny'} value={40} color='olive'/>
    if( daysToDeadline <= 15) return <ProgressBar size={'tiny'} value={30} color='olive'/>
    if( daysToDeadline <= 20) return <ProgressBar size={'tiny'} value={20} color='green'/>
    if( daysToDeadline <= 25) return <ProgressBar size={'tiny'} value={10} color='green'/>
    if( daysToDeadline > 25) return <ProgressBar size={'tiny'} value={0} color='green'/>

  }



  render() {

    if(this.props.pulse.deadline)
    return (
      //<div></div>
      //  
      //<ProgressBar size={'tiny'} percent={100} color='red'/>
       <div>{this.fixedPercentValues()}</div>
    )

    return(<div style={{display: 'none'}}></div>)

  }
}