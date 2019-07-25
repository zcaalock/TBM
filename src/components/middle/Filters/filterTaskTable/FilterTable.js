import React from 'react'
import StatusFilter from './filters/StatusFilter'

class Thead extends React.Component {
  

  pageSelector(){
    const selector = this.props.match.params.selector
    //console.log('selector: ', selector)
    if(selector === 'Status') return  <StatusFilter selector='status' item={this.props.match.params.item} params={this.props.match.params} />
    if(selector === 'LeadPerson') return  <StatusFilter selector='userId' item={this.props.match.params.item} params={this.props.match.params} />
    if(selector === 'Category') return  <StatusFilter selector='categoryId' item={this.props.match.params.item} params={this.props.match.params} />
    if(selector === 'ArchivedPulses') return  <StatusFilter selector='archived' item={this.props.match.params.item} params={this.props.match.params} />
  }

  render() {

    return (
      <div className="" style={{width: "100%"}}>        
         {this.pageSelector()}        
      </div>
    )
  }
}

export default Thead