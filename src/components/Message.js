import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Message } from 'semantic-ui-react'
import { editState } from '../actions/appState'

function ResponceMessage() {
    const appState = useSelector(state => state.appState)
    const dispatch = useDispatch()
    const renderMessage = () => {
        if (appState.responseStatus === 200) {
            setTimeout(() => { 
                dispatch(editState('', 'responseMessage')) 
                dispatch(editState(0, 'responseStatus')) 
            }, 5000)
            return (
                <Message compact positive>
                    <Message.Header>{appState.responseMessage}</Message.Header>
                    <p>status: 200</p>
                </Message>
            )
        }

        if (appState.responseStatus === 500) {
            setTimeout(() => { 
                dispatch(editState('', 'responseMessage')) 
                dispatch(editState(0, 'responseStatus')) 
            }, 5000)
            return (
                <Message compact negative>
                    <Message.Header>Something went wrong</Message.Header>
                    <p>status: 500</p>
                </Message>
            )
        }

        if (appState.responseStatus === 404) {
            setTimeout(() => { 
                dispatch(editState('', 'responseMessage')) 
                dispatch(editState(0, 'responseStatus')) 
            }, 5000)
            return (
                <Message compact negative>
                    <Message.Header>Something went wrong</Message.Header>
                    <p>status: 404</p>
                </Message>
            )
        }
    }

    return (
        <div style={{ position: 'absolute', width: '100%', zIndex: '100' }}>
            <div style={{ margin: 'auto', textAlign: 'center' }}>
                {renderMessage()}
            </div>
        </div>
    )
}

export default ResponceMessage