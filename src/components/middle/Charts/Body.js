import React, { useEffect } from 'react'
import _ from 'lodash'
import { useSelector, useDispatch } from "react-redux"
import {editState} from '../../../actions/appState'
import { Pie } from 'react-chartjs-2'
import { isEmpty } from '../../../actions/helperFunctions'


let leadNameArr = []
let pulseCountForLead = [0,0,0,0,0,0]
function Body() {
  const dispatch = useDispatch()
  const leads = useSelector(state => Object.values(state.lead))
  const pulses = useSelector(state => Object.values(state.pulses))  

  useEffect(()=>{
    generatePulseCountForLead()  
    dispatch(editState('charts', 'id'))     
  },[dispatch])

  

  const generateLeadList = () => {
    if (leads.length > 0)
      leads.map(leadItems => {
        leadNameArr.push(leadItems.title)
        return leadNameArr
      })
    return leadNameArr = _.uniqBy(leadNameArr)
  }

  const generatePulseCountForLead = () => {
    if (leads.length > 0)
      leads.map((lead, key) => {
        pulses.map(pulse => {
          if (pulse.userId === lead.userId) return pulseCountForLead[key] = pulseCountForLead[key] + 1
        })
      })
  } 

  let data = {
    labels: leadNameArr,
    datasets: [{
      label: '# of Votes',
      data: pulseCountForLead,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  }

  let options = {

  }

  //isEmpty(generatePulseCountForLead())
  leadNameArr = _.uniqBy(leadNameArr)
  isEmpty(generateLeadList())

  return (
    <div className='removeScroll' >
      <div style={{ width: '40%' }}><Pie data={data} options={options} /></div>
    </div>

  )
}

export default Body