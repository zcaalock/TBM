import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Search, Checkbox } from 'semantic-ui-react'

import history from '../../../../history'
import { editState } from '../../../../actions/appState'
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

    if (this.props.status.length > 0 && this.props.lead.length > 0 && this.props.pulses.length > 0 && this.props.categories.length > 0) {
      this.props.status.map(status => {
        col.push({ title: status.title, description: 'Status', link: status.title })
        return col
      })
      this.props.lead.map(lead => {
        col.push({ title: lead.title, description: 'LeadPerson', link: lead.userId })
        return col
      })
      this.props.pulses.map(pulse => {
        col.push({ title: _.keyBy(this.props.categories, 'id')[pulse.categoryId].title, description: 'Category', link: pulse.categoryId })
        return col
      })

      col.push({ title: 'Archived', description: 'ArchivedPulses', link: 'true' })
      return col = _.uniqBy(col, 'title')
    }
    //console.log('col: ', col)

  }

  handleOnClick(link, description) {
    if (this.state.results[0])
      if (description === 'ArchivedPulses') {
        this.handleOnCheckBoxClick(this.props.appState.showArchived)
        history.push(`/filters/${description}/${link}`)
      }
      else history.push(`/filters/${description}/${link}`)

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

  defaulCheck(bool) {
    if (bool === 'false')
      return false
    if (bool === 'true')
      return true
  }

  handleOnCheckBoxClick(bool) {
    //console.log('props: ', this.state)
    if (bool === 'false')
      this.props.editState('true', 'showArchived')
    if (bool === 'true') {
      this.props.editState('false', 'showArchived')

      if (this.state.value === "Archived") 
      history.push(`/filters/`)
    }
  }

  renderCheckBoxLabelStyle() {
    if (this.props.appState.showArchived === 'true')
      return 'archivedColorRed'
    if (this.props.appState.showArchived === 'false')
      return 'archivedColor'
  }

  render() {
    if (this.isEmpty(col)) this.makeCollection()
    const { isLoading, value, results } = this.state    
    return (
      <div>
        <div style={{ display: 'inline-block' }}>
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
        </div >
        <div style={{ display: 'inline-block', marginLeft: '10px' }}>
          <Checkbox
            onClick={() => this.handleOnCheckBoxClick(this.props.appState.showArchived)}
            //defaultChecked={this.defaulCheck(this.props.appState.showArchived)}
            checked={this.defaulCheck(this.props.appState.showArchived)}
            slider
            style={{ marginBottom: '-4px', }}
          //label='Show archived' 
          //className={this.renderCheckBoxLabelStyle()}
          />
          <label onClick={() => this.handleOnCheckBoxClick(this.props.appState.showArchived)} className={this.renderCheckBoxLabelStyle()} >Show archived</label>
        </div>

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
    details: Object.values(state.details),
    appState: state.appState
  }
}

export default connect(mapStateToProps, { fetchStatus, fetchPulses, fetchCategories, fetchBoards, fetchLead, fetchDetails, editState })(SearchFilter)
