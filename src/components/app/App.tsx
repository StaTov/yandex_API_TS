import { observer } from 'mobx-react'
import { useContext, useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Context } from '../..'
import Auth from '../Auth/Auth'
import Nav from '../Nav/Nav'
import EmptyPage from '../EmptyPage/EmptyPage'
import DiskApi from '../DiskApi/DiskApi'
import Files from '../Files/Files'

const App = () => {

    const store = useContext(Context)

    useEffect(() => {
        if (!store.token) {
            store.setToken(localStorage.getItem('access_token'))
            return
        }
        store.init()
    }, [store.token])

    return (
        <Routes>
            <Route path='/' element={<Nav />} >
                <Route path='/' element={<DiskApi />} />
                <Route path='/files' element={<Files/>} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/empty' element={<EmptyPage />} />
                <Route path='*' element={<Navigate to='/' replace={true} />} />
            </Route>
        </Routes >
    )
}


export default observer(App)
