import { useContext } from 'react'
import { observer } from 'mobx-react'
import { Context } from '../..'

const Notification = () => {

    const store = useContext(Context)

    const handleClick = () => {
        store.setStyleNote(false)
    }

    const style = store.styleNote
        ? 'notification_container'
        : 'notification_container note-hidden'


    if (store.styleNote) {
        setTimeout(() => store.setStyleNote(false), 7000)
    }


    return (
        <div className={style}>
            <div className='note-bar'></div>
            <span className="notification_body">{store.message}</span>
            <div className='note-btn-wrapper'>
                <div role="button"
                    className="notificationCloseButton"
                    onClick={handleClick} >&#10006;</div>
            </div>

        </div >
    )
}

export default observer(Notification)