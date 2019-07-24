import React from 'react'


class Thead extends React.Component {
  
  

  render() {
    
    return (
      <thead>
        <tr>
          <th style={{paddingLeft: '10px', width: '' }}>Name</th>
          <th style={{width: '10%' }}>Board</th>
          <th style={{width: '10%' }}>Category</th>
          <th style={{width: '20%' }}>Lead Person</th>
          <th style={{width: '120px' }}>Status</th>
          <th style={{width: '10%' }}>Progress</th>
        </tr>
      </thead>
    )
  }
}

export default Thead