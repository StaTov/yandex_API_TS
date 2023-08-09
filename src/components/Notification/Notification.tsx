
import { useContext } from 'react'
import { observer } from 'mobx-react'
import { Context } from '../..'

const Notification = () => {

    const store = useContext(Context)
    const style =  store.message ? 'notification_container' :'notification_container note-hidden'

    const handleClick = () => {
        store.setMessage('')
    }

    return (
        <div className={style}>
            <span className="notification_item">{store.message}</span>
            <span role="button" className="notificationCloseButton" onClick={handleClick} >&#10006;</span>
        </div>
    )
}

export default observer(Notification)