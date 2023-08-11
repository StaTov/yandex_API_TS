import { useContext } from 'react'
import { Context } from '../..'
import FileItem from '../FileItem/FileItem'
import { observer } from 'mobx-react'


const Files = () => {
    const store = useContext(Context)

    if ('items' in store.fileListMeta && Array.isArray(store.fileListMeta.items)) {
        return (
            <div className="container_files">
                <h3>Файлы</h3>
                <div className='file_list'>
                    {store.fileListMeta.items.map(i => <FileItem data={i} key={i.name}/>)}
                </div>
            </div>
        )
    }
    return null
}


export default observer(Files)