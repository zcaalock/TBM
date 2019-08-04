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
let colSplited = []
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
    //console.log('user: ', this.props.user)

  }

  makeCollection() {

    if (this.props.status.length > 0 && this.props.lead.length > 0 && this.props.pulses.length > 0 && this.props.categories.length > 0) {
      this.props.status.map(status => {
        col.push({ title: status.title, description: 'Status', link: status.title, id: status.id, privateId: '' })
        return col
      })
      this.props.lead.map(lead => {
        col.push({ title: lead.title, description: 'LeadPerson', link: lead.userId, id: lead.id, privateId: '' })
        return col
      })

      this.props.pulses.map(pulse => {

        col.push({
          title: `${_.keyBy(this.props.categories, 'id')[pulse.categoryId].title}/${_.filter(this.props.boards, { id: _.keyBy(this.props.categories, 'id')[pulse.categoryId].boardId })[0].title}`,
          description: `Category: ${_.filter(this.props.boards, { id: _.keyBy(this.props.categories, 'id')[pulse.categoryId].boardId })[0].title}`,
          link: pulse.categoryId,
          id: pulse.id,
          privateId: pulse.privateId
          //category: _.filter(this.props.boards, {id: _.keyBy(this.props.categories, 'id')[pulse.categoryId].boardId})[0].title 
        })
        col = _.filter(col, {privateId: ''})
        return col
      })

      col.push({ title: 'Archived', description: 'ArchivedPulses', link: 'true', id: 'Archived', privateId: '' })
      col.push({ title: 'Private', description: 'PrivatePulses', link: this.props.user.credentials.userId, id: '', privateId: this.props.user.credentials.userId })
      col = _.uniqBy(col, 'title')
      colSplited = []
      col.map(col => {
        return colSplited.push({ title: col.title.split('/')[0], id: col.id, link: col.link, description: col.description })
      })

      //console.log('col: ', col)

    }
    //console.log('col: ',col)
    //console.log('re: ',colSplited)

  }

  handleOnClick(link, description, title) {
    if (this.state.results[0])
      if (description === 'ArchivedPulses') {
        this.props.editState('true', 'showArchived')
        this.props.editState({ selector: description, value: title.split('/')[0] }, 'filter')
        history.push(`/filters/${description.split(':')[0]}/${link}`)
      }
      else history.push(`/filters/${description.split(':')[0]}/${link}`)
    this.props.editState({ selector: description.split(':')[0], value: title.split('/')[0] }, 'filter')

  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title.split('/')[0] }); this.handleOnClick(result.link, result.description, result.title.split('/')[0])
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      const results = _.filter(colSplited, isMatch).map(result => ({ ...result, key: result.id }));

      this.setState({
        isLoading: false,
        results: results//_.filter(colSplited, isMatch),
      })
    }, 300)
  }

  defaulCheck(bool) {
    if (bool === 'false')
      return false
    if (bool === 'true')
      return true
  }

  handleOnCheckBoxClick(bool, selector) {
    console.log('props: ', selector)
    if (bool === 'false') {
      this.props.editState('true', selector)
      if (this.state.value === "Archived" && selector === 'showArchived') {
        this.props.editState({ selector: 'ArchivedPulses', value: 'true' }, 'filter')
        history.push(`/filters/ArchivedPulses/true`)
      }
    }
    if (bool === 'true') {
      this.props.editState('false', selector)
      if (this.state.value === "Archived" && selector === 'showArchived') {
        this.props.editState({ selector: 'AllActivePulses', value: 'true' }, 'filter')
        console.log('go ')
        history.push(`/filters/ArchivedPulses/false`)
      }
    }
  }

  renderCheckBoxLabelStyle(selector) {
    if (selector === 'true')
      return 'archivedColorRed'
    if (selector === 'false')
      return 'archivedColor'
  }

  render() {
    //console.log('state: ', this.state)
    if (this.isEmpty(colSplited)) this.makeCollection()
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
            onClick={() => this.handleOnCheckBoxClick(this.props.appState.showArchived, 'showArchived')}
            //defaultChecked={this.defaulCheck(this.props.appState.showArchived)}
            checked={this.defaulCheck(this.props.appState.showArchived)}
            slider
            style={{ marginBottom: '-4px', }}
          //label='Show archived' 
          //className={this.renderCheckBoxLabelStyle()}
          />
          <label onClick={() => this.handleOnCheckBoxClick(this.props.appState.showArchived, 'showArchived')} className={this.renderCheckBoxLabelStyle(this.props.appState.showArchived)} >Show archived</label>
        </div>
        <div style={{ display: 'inline-block', marginLeft: '10px' }}>
          <Checkbox
            onClick={() => this.handleOnCheckBoxClick(this.props.appState.hideEmptyDates, 'hideEmptyDates')}
            //defaultChecked={this.defaulCheck(this.props.appState.showArchived)}
            checked={this.defaulCheck(this.props.appState.hideEmptyDates)}
            slider
            style={{ marginBottom: '-4px', }}
          //label='Show archived' 
          //className={this.renderCheckBoxLabelStyle()}
          />
          <label onClick={() => this.handleOnCheckBoxClick(this.props.appState.hideEmptyDates, 'hideEmptyDates')} className={this.renderCheckBoxLabelStyle(this.props.appState.hideEmptyDates)} >Hide empty dates</label>
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
    user: state.user,
    appState: state.appState
  }
}

export default connect(mapStateToProps, { fetchStatus, fetchPulses, fetchCategories, fetchBoards, fetchLead, fetchDetails, editState })(SearchFilter)
