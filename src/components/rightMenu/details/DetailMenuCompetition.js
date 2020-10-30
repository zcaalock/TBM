import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deleteDetail, editDetail } from '../../../actions/details'
import _ from 'lodash'
import { Popup, Dropdown } from 'semantic-ui-react'
import { format } from 'date-fns'
import { useTranslation } from "react-i18next"

function DetailIcon(props) {
    const userId = useSelector(state => state.user.credentials.userId)
    const dispatch = useDispatch();
    const { t } = useTranslation()

    function renderFlag() {
        if (props.detail.flag === true) return <div
            onClick={() => dispatch(editDetail(props.detail.id, { flag: false }, userId, true))}
            className="hideDetailArrows"
            data-position="top right"
            data-tooltip={t("Remove flag")}
            style={{
                display: 'inline-block',
                cursor: 'pointer'
            }}>
            <i style={{ color: '#DC6969' }} className="flag icon" />
        </div>
    }

    const moveUp = (id, created, detailArr) => {
        const prev = _.find(detailArr, { number: detailArr[_.find(detailArr, { id: id }).number].number - 1 })
        if (prev) dispatch(editDetail(id, { createdAt: prev.createdAt }, userId, true))
        if (prev) dispatch(editDetail(prev.id, { createdAt: created }, userId, true))
    }

    const moveDown = (id, created, detailArr) => {
        const next = _.find(detailArr, { number: detailArr[_.find(detailArr, { id: id }).number].number + 1 })
        if (next) dispatch(editDetail(id, { createdAt: next.createdAt }, userId, true))
        if (next) dispatch(editDetail(next.id, { createdAt: created }, userId, true))
    }

    const renderUp = () => {
        const prev = _.find(props.detailArr, { number: props.detailArr[_.find(props.detailArr, { id: props.competitionId }).number].number - 1 })
        if (prev) return <Dropdown.Item
            icon='chevron up'
            content={t('Move up')}
            onClick={() => moveUp(props.detail.id, props.detail.createdAt, props.detailArr)}
        />
    }

    const renderDown = () => {
        const next = _.find(props.detailArr, { number: props.detailArr[_.find(props.detailArr, { id: props.competitionId }).number].number + 1 })
        if (next) return <Dropdown.Item
            icon='chevron down'
            content={t('Move down')}
            onClick={() => moveDown(props.detail.id, props.detail.createdAt, props.detailArr)}
        />
    }

    return (
        <div style={{ textAlign: 'right' }}>
            {renderFlag()}
            <Popup position='top right' style={{ display: 'inline-block' }} trigger={<i className="articleIcon info icon" />}>
                {/* <Popup.Header>User Rating</Popup.Header> */}
                <Popup.Content>
                    {t('Created by')}: {props.createdUser ? props.createdUser.title : t('no info')} <br />
                    {t('Edited by')}: {props.editedUser ? props.editedUser.title : t('no info')} <br />
                    {t('Edited at')}: {props.editedAt ? format(new Date(props.editedAt), 'dd/MM/yyyy | HH:mm:ss') : t('no info')}
                </Popup.Content>
            </Popup>
            <Dropdown icon='bars' pointing='right' className='articleIcon'>
                <Dropdown.Menu>
                    <Dropdown.Header icon='bars' content={`${t('Details')} menu:`} />
                    <Dropdown.Divider />
                    <Dropdown.Item
                        onClick={() => { props.showEdit() }}
                        content={t("Edit")}
                        icon='edit'
                    />                    
                    <Dropdown.Item
                        content={props.detail.flag === true ? t('Remove flag') : t('Add flag')}
                        icon={props.detail.flag === true ? <i style={{ color: '#DC6969' }} className="flag icon" /> : 'flag'}
                        onClick={() => dispatch(editDetail(props.detail.id, { flag: !props.detail.flag || props.detail.flat === '' ? true : !props.detail.flag }, userId, true))}
                    />
                    <Dropdown.Item
                        onClick={() => { dispatch(deleteDetail(props.competitionId)) }}
                        content={t("Delete")}
                        icon='trash'
                    />
                    <Dropdown.Divider />
                    <Dropdown.Header content={`${t('Move')}:`} />
                    {renderUp()}
                    {renderDown()}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default DetailIcon
