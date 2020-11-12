import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash'
import { editState } from '../../actions/appState'
import { deleteContact, editContact } from '../../actions/contacts'
import EditContactModal from '../Forms/EditContactModal'
import { useTranslation } from "react-i18next"
import { Dropdown } from 'semantic-ui-react'

function HeaderIcons(props) {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const appState = useSelector(state => state.appState)
    const details = useSelector(state => Object.values(state.details))
    const notepad = useSelector(state => Object.values(state.notepad))    
    const user = useSelector(state => state.user.credentials)

    const archived = props.contact.archived
    const privateId = props.contact.privateId
    const userId = user.userId
    const id = props.contact.id
    const editContactOpen = appState.editContactOpen? appState.editContactOpen:false


    const ShowEditContactModal = () => {
        return editContactOpen === true ? <EditContactModal contact={props.contact} /> : null
    }

    const renderDelete = () => {
        const detailsFiltered = _.filter(details, { pulseId: id })
        const notepadFiltered = _.filter(notepad, { pulseId: id })

        if (detailsFiltered.length > 0 || notepadFiltered.length > 0) {
            return (
                <Dropdown.Item
                    disabled
                    data-position="left center"
                    data-tooltip={t("Remove all items before delete")}
                    content={t("Delete")}
                    icon="trash"
                />
            )
        } return (
            <Dropdown.Item
                onClick={() => { dispatch(deleteContact(id)) }}
                content={t("Delete")}
                icon="trash"
            />
        )
    }

    function renderArchived() {
        if (archived === 'true') return (
            <div
                onClick={() => dispatch(editContact(id, { archived: 'false' }))}
                data-position="left center"
                data-tooltip={t("Unarchive")}
                style={{ color: '#DC6969', cursor: 'pointer' }}>
                <i className=" archive icon" />
            </div>)
    }

    function renderPrivate() {
        if (privateId === user.userId) return (
            <div
                onClick={() => dispatch(editContact(id, { privateId: '' }))}
                data-position="left center"
                data-tooltip={t("Make public")}
                style={{ color: '#00A569', cursor: 'pointer' }}>
                <i className=" privacy icon" />
            </div>)
    }

        return (
        <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>

            {renderArchived()}
            {renderPrivate()}

            <Dropdown icon='bars' pointing='right' className='articleIcon'>
                <Dropdown.Menu>
                    <Dropdown.Header icon='bars' content={`${t('Contact menu')}:`} />
                    <Dropdown.Divider />
                    <Dropdown.Item
                        onClick={() => dispatch(editState(true, 'editContactOpen'))}
                        content={t("Edit")}
                        icon='edit'
                    />
                    <Dropdown.Item
                        content={archived === 'true' ? t('Unarchive') : t('Archive')}
                        icon={archived === 'true' ? <i className=" archive icon" style={{ color: '#DC6969' }} /> : 'archive'}
                        onClick={() => archived === 'true' ? dispatch(editContact(id, { archived: 'false' })) : dispatch(editContact(id, { archived: 'true' }))}
                    />
                    <Dropdown.Item
                        content={privateId === userId ? t('Make public') : t('Make private')}
                        onClick={() => privateId === userId ? dispatch(editContact(id, { privateId: '' })) : dispatch(editContact(id, { privateId: userId }))}
                        icon={privateId === userId ? <i className="privacy icon" style={{ color: '#00A569' }} /> : 'privacy'}
                    />
                    {renderDelete()}
                </Dropdown.Menu>
            </Dropdown>
            {ShowEditContactModal()}
        </div>
    )
}

export default HeaderIcons
