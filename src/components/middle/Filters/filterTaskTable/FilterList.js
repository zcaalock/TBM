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




let col = [
  // {
  //   title: "AO",
  //   description: "Lead Person"
  // },
  // {
  //   title: "Done",
  //   description: "Status"
  // },
  // {
  //   title: "Archived",
  //   description: "link"
  // }
]


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
    if (this.isEmpty(this.props.categories)) this.props.fetchCategories()

  }

  makeCollection() {

    if (this.props.status.length > 0)
      this.props.status.map(person => {
        //console.log('personh', person.title)
        col.push({ title: person.title, description: 'LeadPerson' })

      })
    col = _.uniqBy(col, 'title')
    console.log('bb: ', col)
  }

  handleOnClick(title, description) {
    if (this.state.results[0])
      history.push(`/filters/${description}/${title}`)
  }

  handleOnFocus() {
    this.makeCollection()
  }

  handleResultSelect = (e, { result }) => {this.setState({ value: { title: result.title, description: result.description } }); this.handleOnClick(result.title, result.description)}

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
    //console.log('state:', this.state)
    const { isLoading, value, results } = this.state

    return (

      <div>
        <Search
          onFocus={() => this.handleOnFocus()}
          //onClick={()=> this.handleOnClick()}
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true,
          })}
          results={results}
          value={value.title}
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
    categories: Object.values(state.categories)
  }

}

export default connect(mapStateToProps, { fetchStatus, fetchPulses, fetchCategories, fetchBoards, fetchLead })(SearchFilter)
