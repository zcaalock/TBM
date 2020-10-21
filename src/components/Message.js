import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Message } from 'semantic-ui-react'
import { editState } from '../actions/appState'
import _ from 'lodash'
import { useTranslation } from "react-i18next"

function ResponceMessage() {
    const appState = useSelector(state => state.appState)
    const userId = useSelector(state => state.user.credentials.userId)
    const lead = useSelector(state => _.find(state.lead, { userId: userId }))
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    const renderMessage = () => {
        if (appState.responseStatus === 200 && lead && lead.settings.messages === true) {
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

        if (appState.responseStatus === 500 && lead && lead.settings.messages === true) {
            setTimeout(() => {
                dispatch(editState('', 'responseMessage'))
                dispatch(editState(0, 'responseStatus'))
            }, 5000)
            return (
                <Message compact negative>
                    <Message.Header>{t('Something went wrong')}</Message.Header>
                    <p>status: 500</p>
                </Message>
            )
        }

        if (appState.responseStatus === 404 && lead && lead.settings.messages === true) {
            setTimeout(() => {
                dispatch(editState('', 'responseMessage'))
                dispatch(editState(0, 'responseStatus'))
            }, 5000)
            return (
                <Message compact negative>
                    <Message.Header>{t('Something went wrong')}</Message.Header>
                    <p>status: 404</p>
                </Message>
            )
        }

        if (appState.responseStatus === 666 && lead && lead.settings.messages === true) {
            setTimeout(() => {
                dispatch(editState('', 'responseMessage'))
                dispatch(editState(0, 'responseStatus'))
            }, 5000)
            return (
                <Message compact negative>
                    <Message.Header>{t('Something went wrong')}</Message.Header>
                    <label>{appState.responseMessage}</label>
                    <p>status: 666</p>
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