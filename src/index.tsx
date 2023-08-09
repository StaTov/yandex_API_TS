
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/app/App'
import { BrowserRouter } from 'react-router-dom'
import Store from './store/store'
import { createContext } from 'react'


const store = new Store()
export const Context = createContext(store)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(

    <Context.Provider value={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context.Provider>

)


