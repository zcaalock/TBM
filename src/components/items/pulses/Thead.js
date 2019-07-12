import React from 'react'


class Thead extends React.Component {
  
  

  render() {
    
    return (
      <thead>
        <tr>
          <th style={{paddingLeft: '10px', width: '60%' }}>Name</th>
          <th>Lead Person</th>
          <th>Status</th>
        </tr>
      </thead>
    )
  }
}

export default Thead