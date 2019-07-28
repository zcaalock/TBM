import React from 'react'


class Thead extends React.Component {
  
  

  render() {
    
    return (
      <thead >
        <tr >
          <th style={{paddingLeft: '10px', width: '' }}>Name</th>
          <th style={{width: '15%', minWidth: '100px' }}>Lead Person</th>
          <th style={{width: '120px' }}>Status</th>
          <th style={{width: '10%' }}>Details</th>
        </tr>
      </thead>
    )
  }
}

export default Thead