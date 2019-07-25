import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Search } from 'semantic-ui-react'
import history from '../../../../history'
import { fetchStatus } from '../../../../actions/status'
import { fetchPulses } from '../../../../actions/pulses'
import { fetchCategories } from '../../../../actions/categories'
import { fetchBoards } from '../../../../actions/boards'
import { fetchLead } from '../../../../actions/settings'
import { fetchDetails } from '../../../../actions/details'


let col = []
const initialState = { isLoading: false, results: [], value: '' }

class SearchFilter extends React.Component {
  state = initialState

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  componentDidMount() {
    if (this.isEmpty(this.props.boards)) this.props.fetchBoards()
    if (this.isEmpty(this.props.status)) this.props.fetchStatus()
    if (this.isEmpty(this.props.pulses)) this.props.fetchPulses()
    if (this.isEmpty(this.props.details)) this.props.fetchDetails()
    if (this.isEmpty(this.props.lead)) this.props.fetchLead()
    if (this.isEmpty(this.props.categories)) this.props.fetchCategories()
    this.makeCollection()
  }

  makeCollection() {
    
    if (this.props.status.length > 0 && this.props.lead.length > 0 && this.props.pulses.length >0 && this.props.categories.length > 0) {
      this.props.status.map(status => {        
        col.push({ title: status.title, description: 'Status', link: status.title })
      })
      this.props.lead.map(lead => {        
        col.push({ title: lead.title, description: 'LeadPerson', link: lead.userId })
      })
      this.props.pulses.map(pulse => {            
        col.push({ title: _.keyBy(this.props.categories, 'id')[pulse.categoryId].title, description: 'Category', link: pulse.categoryId})
      })
    }
    //console.log('col: ', col)
    return col = _.uniqBy(col, 'title')
  }

  handleOnClick(link, description) {
    if (this.state.results[0])
      history.push(`/filters/${description}/${link}`)
  }  

  handleResultSelect = (e, { result }) => { this.setState({ value: result.title }); this.handleOnClick(result.link, result.description) }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(col, isMatch),
      })
    }, 300)
  }

  render() {
    if (this.isEmpty(col)) this.makeCollection()    
    const { isLoading, value, results } = this.state

    return (
      <div>
        <Search
          //onFocus={() => this.handleOnFocus()}
          //onClick={()=> this.handleOnClick()}
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true,
          })}
          results={results}
          value={value}
        //{...this.props}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lead: Object.values(state.lead),
    status: Object.values(state.status),
    pulses: Object.values(state.pulses),
    boards: Object.values(state.boards),
    categories: Object.values(state.categories),
    details: Object.values(state.details)
  }
}

export default connect(mapStateToProps, { fetchStatus, fetchPulses, fetchCategories, fetchBoards, fetchLead, fetchDetails })(SearchFilter)
