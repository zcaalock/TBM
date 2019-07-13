import React from 'react'


class Thead extends React.Component {
  
  

  render() {
    
    return (
      <thead>
        <tr>
          <th style={{paddingLeft: '10px', width: '70%' }}>Name</th>
          <th style={{width: '10%' }}>Lead Person</th>
          <th style={{width: '10%' }}>Status</th>
          <th style={{width: '10%' }}>Status</th>
        </tr>
      </thead>
    )
  }
}

export default Thead