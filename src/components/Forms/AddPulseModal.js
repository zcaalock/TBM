import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import { Button, Modal, Form, Input, Select } from 'semantic-ui-react'
import { editState } from '../../actions/appState'
import {createPulse} from '../../actions/pulses'
import { fetchLead } from '../../actions/settings'
import { fetchBoards } from '../../actions/boards'
import { fetchCategories } from '../../actions/categories'


let boards = []
let categories = []
let lead =[]

class PulseModal extends Component {

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }


  componentDidMount() {
    if (this.isEmpty(this.props.boards)) this.props.fetchBoards()
    if (this.isEmpty(this.props.lead)) this.props.fetchLead()

  }

  constructor() {
    super()
    this.state = {
      name: '',
      boardId: '',
      categoryId: '',
      userId: ''
    }
  }

  handleSubmit() {
    //console.log('formValues', formValues)
    const userData = {
      title: this.state.name      
    };

    this.props.createPulse(userData, this.state.categoryId, this.state.userId );
    this.close()
  }

  generateLeadList() {
    //console.log('lead: ', this.props.lead)
    if (this.props.lead.length > 0)
      this.props.lead.map(leadItems => {
        lead.push({ key: leadItems.userId, text: leadItems.title, value: leadItems.userId })
        return lead
      })
    return lead = _.uniqBy(lead, 'text')
  }

  generateBoardList() {
    if (this.props.boards.length > 0)
      this.props.boards.map(board => {
        boards.push({ key: board.id, text: board.title, value: board.id })
        return boards
      })
    return boards = _.uniqBy(boards, 'text')
  }

  generateCategoriesList() {    
    if (this.props.categories.length > 0){      
      _.filter(this.props.categories, { boardId: this.state.boardId })
        .map(category => {
          categories.push({ key: category.id, text: category.title, value: category.id })
          return categories
        })
    }    
    return categories = _.uniqBy(categories, 'text')
    
  }
  activateLeadField() { if (this.state.name === '') {return true} else {return false}}
  activateBoardField() { if (this.state.userId === '') {return true} else {return false}}
  activateCategoryField() { if (this.state.boardId === '') {return true} {return false}}
  activateSubmit() { if (this.state.categoryId === '') {return true} {return false}}

  defaulCheck(bool) {
    if (bool === 'false')
      return false
    if (bool === 'true')
      return true
  }

  close = () => {this.props.editState('false', 'addPulseOpen'); this.setState({name: '', boardId: '', categoryId: '',  userId: ''})   }
  render() {
    if (this.isEmpty(boards)) this.generateBoardList()
    if (this.isEmpty(categories)) this.generateCategoriesList()
    if (this.isEmpty(lead)) this.generateLeadList()
    //console.log('state', this.state)
    const { addPulseOpen } = this.props.appState

    return (
      <div>
        <Modal size='tiny' dimmer='inverted' open={this.defaulCheck(addPulseOpen)} onClose={this.close}>
          <Modal.Header>Create new Pulse</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form
                onSubmit={this.handleSubmit}>
                <Form.Field
                  id='name'
                  name='name'
                  control={Input}
                  label='Pulse name'
                  placeholder='Pulse name'
                  //value={this.state.name}
                  onChange={(e, { value }) => this.setState({ name: value })}
                />
                <Form.Field
                  search
                  disabled={this.activateLeadField()}
                  name='userId'
                  control={Select}
                  //onFocus={this.handleBoardList()}
                  options={lead}
                  label='Lead Person'
                  placeholder='Lead Person'
                  searchInput={{ id: 'userId' }}
                  onChange={(e, { value }) => this.setState({ userId: value })}
                />
                <Form.Field
                  search
                  disabled={this.activateBoardField()}
                  name='boardId'
                  control={Select}
                  //onFocus={this.handleBoardList()}
                  options={boards}
                  label='Board name'
                  placeholder='Board name'
                  searchInput={{ id: 'boardId' }}
                  onChange={(e, { value }) => {this.setState({ boardId: value }); categories=[]   }}
                />
                <Form.Field
                  search
                  disabled={this.activateCategoryField()}
                  name='categoryId'
                  control={Select}
                  //onFocus={this.handleBoardList()}
                  options={categories}
                  label='Category name'
                  placeholder='Cateogry name'
                  searchInput={{ id: 'categoryId' }}
                  onChange={(e, { value }) => this.setState({ categoryId: value })}
                />


                {/* <Form.Field
                  id='form-button-control-public'
                  control={Button}
                  content='Confirm'
                  label='Label with htmlFor'
                /> */}
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close}>
              Cancel
            </Button>
            <Button
              disabled={this.activateSubmit()}
              form='my-form'
              onClick={() => this.handleSubmit()}
              icon='checkmark'
              labelPosition='right'
              content="Create pulse"
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    boards: Object.values(state.boards),
    categories: Object.values(state.categories),
    lead: Object.values(state.lead),
    appState: state.appState,
    
  }
}

export default connect(mapStateToProps, { editState, fetchBoards, fetchCategories, createPulse, fetchLead })(PulseModal)