import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash'
import { editState } from '../../actions/appState'
import { deletePulse, editPulse } from '../../actions/pulses'
import EditPulseModal from '../Forms/EditPulseModal'
import PulseModal from '../Forms/PulseModal'
import { useTranslation } from "react-i18next"
import { Dropdown } from 'semantic-ui-react'

let pulseArr = []

function HeaderIcons(props) {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const appState = useSelector(state => state.appState)
    const details = useSelector(state => Object.values(state.details))
    const pulses = useSelector(state => Object.values(state.pulses))
    const notepad = useSelector(state => Object.values(state.notepad))
    const lead = useSelector(state => Object.values(state.lead))
    const user = useSelector(state => state.user.credentials)

    const archived = props.pulse.archived
    const privateId = props.pulse.privateId
    const userId = user.userId
    const id = props.pulse.id
    const editPulseOpen = appState.editPulseOpen
    const pulseOpen = appState.pulseOpen

    let findPulses = _.sortBy(_.filter(pulses, { categoryId: props.pulse.categoryId }), 'createdAt')
    let showArchived = _.find(lead, { userId: user.userId }).settings.showArchived


    const ShowEditPulseModal = () => {
        return editPulseOpen === true ? <EditPulseModal /> : null
    }

    const ShowPulseModal = () => {
        return pulseOpen === true ? <PulseModal /> : null
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
                onClick={() => { dispatch(deletePulse(id)) }}
                content={t("Delete")}
                icon="trash"
            />
        )
    }

    function renderArchived() {
        if (archived === 'true') return (
            <div
                onClick={() => dispatch(editPulse(id, { archived: 'false' }))}
                data-position="left center"
                data-tooltip={t("Unarchive")}
                style={{ color: '#DC6969', paddingRight: '5px', cursor: 'pointer' }}>
                <i className=" archive icon" />
            </div>)
    }

    function renderPrivate() {
        if (privateId === user.userId) return (
            <div
                onClick={() => dispatch(editPulse(id, { privateId: '' }))}
                data-position="left center"
                data-tooltip={t("Make public")}
                style={{ color: '#00A569', paddingRight: '5px', cursor: 'pointer' }}>
                <i className=" privacy icon" />
            </div>)
    }   
    
    

    const moveUp = (id, created, arr) => {
        const prev = arr? _.find(arr, { number: arr[_.find(arr, { id: id }).number].number - 1 }) : null
        if (prev) dispatch(editPulse(id, { createdAt: prev.createdAt }))
        if (prev) dispatch(editPulse(prev.id, { createdAt: created }))
    }

    const moveDown = (id, created, arr) => {
        const next = arr? _.find(arr, { number: arr[_.find(arr, { id: id }).number].number + 1 }) : null        
        if (next) dispatch(editPulse(id, { createdAt: next.createdAt }))
        if (next) dispatch(editPulse(next.id, { createdAt: created }))
    }

    pulseArr = []
        findPulses.map(pulse => {
            pulseArr.push({ number: pulseArr.length, id: pulse.id, createdAt: pulse.createdAt, archived: pulse.archived, privateId: pulse.privateId })
            if (showArchived === false) pulseArr = _.chain(pulseArr).reject({ archived: 'true' }).value() 
            return pulseArr = _.uniqBy(pulseArr, 'id' )
        })

    const renderUp = () => {        

        const prev = pulseArr.length > 0 && props.pulse.archived === 'false' ? _.find(pulseArr, { number: pulseArr[_.find(pulseArr, { id: id }).number].number - 1 }) : null
        if (prev) return <Dropdown.Item
            icon='chevron up'
            content={t('Move up')}
            onClick={() => moveUp(id, props.pulse.createdAt, pulseArr)}
        />
    }

    const renderDown = () => {          

        const next = pulseArr.length > 0  && props.pulse.archived === 'false' ? _.find(pulseArr, { number: pulseArr[_.find(pulseArr, { id: id }).number].number + 1 }) : null
        if (next) return <Dropdown.Item
            icon='chevron down'
            content={t('Move down')}
            onClick={() => moveDown(id, props.pulse.createdAt, pulseArr)}
        />
    }    
   
    return (
        <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>

            {renderArchived()}
            {renderPrivate()}

            <Dropdown icon='bars' pointing='right' className='articleIcon'>
                <Dropdown.Menu>
                    <Dropdown.Header icon='bars' content='Puls menu:' />
                    <Dropdown.Divider />
                    <Dropdown.Item
                        onClick={() => dispatch(editState(true, 'pulseOpen'))}
                        content={t("StopWatch")}
                        icon='time'
                    />
                    <Dropdown.Item
                        onClick={() => dispatch(editState(true, 'editPulseOpen'))}
                        content={t("Edit")}
                        icon='edit'
                    />
                    <Dropdown.Item
                        content={archived === 'true' ? t('Unarchive') : t('Archive')}
                        icon={archived === 'true' ? <i className=" archive icon" style={{ color: '#DC6969' }} /> : 'archive'}
                        onClick={() => archived === 'true' ? dispatch(editPulse(id, { archived: 'false' })) : dispatch(editPulse(id, { archived: 'true' }))}
                    />
                    <Dropdown.Item
                        content={privateId === userId ? t('Make public') : t('Make private')}
                        onClick={() => privateId === userId ? dispatch(editPulse(id, { privateId: '' })) : dispatch(editPulse(id, { privateId: userId }))}
                        icon={privateId === userId ? <i className="privacy icon" style={{ color: '#00A569' }} /> : 'privacy'}
                    />
                    {renderDelete()}
                    <Dropdown.Header content={`${t('Move')}:`} />
                    {renderUp()}
                    {renderDown()}
                </Dropdown.Menu>
            </Dropdown>
            {ShowEditPulseModal()}
            {ShowPulseModal()}
        </div>
    )
}

export default HeaderIcons
