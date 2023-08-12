import { useRef, useContext } from 'react'
import Notification from '../Notification/Notification'
import { observer } from 'mobx-react'
import { Context } from '../..'



const DiskApi = () => {

    const store = useContext(Context)


    const aRef = useRef<HTMLInputElement>(null)
    const files = store.fileList ? Array.from(store.fileList) : []
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return
        }
        if (e.target.files.length > 100) {
            store.setMessage('Максимальное количество файлов 100')
            store.setFileList(null)
            if (aRef.current && aRef.current.files) {
                aRef.current.files = null
            }
            return
        }
        store.setFileList(e.target.files)
    }

    const handleUploadAll = () => {
        store.uploadAllFiles(files)
        if (aRef.current && aRef.current.files) {
            aRef.current.files = null
        }
    }

    const handleRemoveByClick = (name: string) => {
        store.removeOneFromList(name)
    }

    return (
        <>
            <div className='container_bx'>
                <div className='box'>
                    <h2 className='upload_title'>Добавить файлы на диск</h2>
                    <div className='upload_bx'>
                        <input disabled={store.isLoading} ref={aRef} type="file" onChange={handleFileChange} id='upload_input' multiple hidden />
                        <label htmlFor='upload_input' className='upload_label'>
                            <span className='fa fa-cloud-download'></span>
                            <div className='upload_text'>Click To Upload</div>
                        </label>
                        <div className="buttonwrapper" >
                            <button disabled={store.isLoading} onClick={handleUploadAll}>
                                {
                                    store.isLoading
                                        ? <i className='fa fa-refresh fa-spiner'></i>
                                        : 'загрузить'
                                }
                            </button>
                        </div>
                        <div id='filewrapper'>
                            <h3 className='uploaded'>Выбранные файлы</h3>
                            {files.map((file, i) => (
                                <div className='filebox' key={i}>
                                    <div className='left'>
                                        <span className='filetype'>{file.type}</span>
                                        <h3>{file.name}</h3>
                                    </div>
                                    <div className='right'>
                                        <span onClick={() => handleRemoveByClick(file.name)}>&#215;</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Notification />
            </div>
        </>
    )
}

export default observer(DiskApi)