import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Context } from '../..'

const Nav = () => {

    const store = useContext(Context)

    const navigate = useNavigate()
    const handleLogin = () => navigate('/auth')
    const handleLogout = () => {
        localStorage.removeItem('access_token')
        store.setClearUserInfo()
        store.setToken(null)
    }

    return (
        <div className='container'>
            <nav>
                <div className='navBox'>
                </div>
                <div className='navBox'>Yandex Disk API</div>
                <div className='navBox-right'>
                    <span>{store.userName}</span>
                    {
                        store.token
                            ? <button title='выйти' onClick={handleLogout}>logout</button>
                            : <button onClick={handleLogin}>login</button>
                    }
                </div>
            </nav>
            <div className='navbar-info'>
                <div></div>
                {
                    store.token &&
                    <div className='diskspace-info'>
                        <div className='diskspace-info-box'>
                            <i className='fa fa-hdd-o'></i>
                            <div className='loadText'>свободно {store.getFreeSpace()} гб из {store.totalSpace} гб</div>
                        </div>
                        <div className='load'>
                            <div style={{ width: `${store.getLoaderPercent()}%` }}> </div>
                        </div>
                    </div>
                }
            </div>
            <Outlet />
        </div >
    )
}

export default observer(Nav)