import React, { useEffect } from 'react'
import _ from 'lodash'
import { useSelector, useDispatch } from "react-redux"
import { editState } from '../../../../actions/appState'
import { Pie } from 'react-chartjs-2'
import { isEmpty } from '../../../../actions/helperFunctions'
import { useTranslation } from "react-i18next"

let leadNameArr = []
let pulseCountForLead = [0, 0, 0, 0, 0, 0]
let pulseArchived = []
function Pulses() {
  const dispatch = useDispatch()
  const leads = useSelector(state => Object.values(state.lead))
  const pulses = useSelector(state => Object.values(state.pulses))
  const user = useSelector(state => state.user.credentials.userId)
  const { t } = useTranslation()
  useEffect(() => {

    generatePulseCountForLead()
    generatePulseArchived()
    dispatch(editState('charts', 'id'))
    return () => { pulseCountForLead = [0, 0, 0, 0, 0, 0]; pulseArchived = [] }
  }, [])



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
          return null
        })
        return pulseCountForLead
      })
    return pulseCountForLead
  }

  const generatePulseArchived = () => {
    if (leads.length > 0)
      leads.map((lead, key) => {
        let arch = 0
        let narch = 0
        pulses.map(pulse => {
          if (pulse.userId === lead.userId && pulse.archived === 'true') return arch = arch + 1
          if (pulse.userId === lead.userId && pulse.archived === 'false') return narch = narch + 1
          return null
        })
        return pulseArchived.push(arch, narch)
      })
    return pulseArchived
  }

  let data = {
    datasets: [{
      label: '1',
      data: pulseCountForLead,
      backgroundColor: [
        'rgba(155, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 156, 186, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      labels: leadNameArr
    }, {
      label: '2',
      data: pulseArchived,
      backgroundColor: [

        '#DC6969',
        '#00A569',
        '#DC6969',
        '#00A569',
        '#DC6969',
        '#00A569',
        '#DC6969',
        '#00A569',
        '#DC6969',
        '#00A569',
        '#DC6969',
        '#00A569'
      ],
      labels: [t('Archived'), t('Active'), t('Archived'), t('Active'), t('Archived'), t('Active'), t('Archived'), t('Active'), t('Archived'), t('Active'), t('Archived'), t('Active'),]
    }],
    labels: leadNameArr
  }



  let options = {
    title: {
      display: true,
      text: t('Pulses')
    },
    responsive: true,
    legend: {
      display: true,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var index = tooltipItem.index;
          return dataset.labels[index] + ': ' + dataset.data[index];
        }
      }
    }
  }

  //isEmpty(generatePulseCountForLead())
  leadNameArr = _.uniqBy(leadNameArr)
  isEmpty(generateLeadList())

  function unlock(number) {
    let countPulses = _.filter(pulses, { userId: user })    
    if (number >= countPulses.length) return 0.2 //<div style={{ position: 'absolute', width: '100px', height: '100px', backgroundColor: 'rgb(255,255,255,0.8)', zIndex: 1 }}></div>
    return null
  }

  return (
    < >      
      <div style={{ width: '40%', display: 'flex', justifyContent:'space-between', margin: 'auto', paddingTop: '15px' }}>
        <div>          
          <img style={{ width: '100px', opacity: unlock(50) }} src='images/50.png' alt='arvhivment 50'></img>
        </div>
        <div>          
          <img style={{ width: '100px', opacity: unlock(150) }} src='images/150.png' alt='arvhivment 150'></img>
        </div>
        <div>          
          <img style={{ width: '100px', opacity: unlock(350) }} src='images/300.png' alt='arvhivment 350'></img>
        </div>
        <div>          
          <img style={{ width: '100px', opacity: unlock(500) }} src='images/500.png' alt='arvhivment 500'></img>
        </div>
        <div>         
          <img style={{ width: '100px', opacity: unlock(1000) }} src='images/1000.png' alt='arvhivment 1000'></img>
        </div>      
      </div>
      <div style={{ width: '60%', margin: 'auto' }}><Pie data={data} options={options} /></div>
    </>

  )
}

export default Pulses