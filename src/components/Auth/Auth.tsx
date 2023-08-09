import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { yandexInit } from '../../utils/helper'
import { observer } from 'mobx-react'
import { Context } from '../..'


const Auth = () => {

    const store = useContext(Context)
    const navigate = useNavigate()


    useEffect(() => {
        if (store.token) {
            navigate('/')
        }
        yandexInit(store.setToken)
    }, [store.token, navigate])

    return (
        <>
            <div className='container_pageload'>
                <div>Авторизация</div>
                <div id='yaBtn'></div>
            </div>
        </>
    )
}

export default observer(Auth)