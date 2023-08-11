import { observer } from 'mobx-react'
import { FileItemProps } from '../../types'
import file_service from '../../services/file-service'
import { useContext, useEffect } from 'react'
import { Context } from '../..'

interface Props {
    data: FileItemProps
}

const FileItem = ({ data }: Props) => {

    const store = useContext(Context)
    const imgUrl = store.getImgUrl(data.name)

    useEffect(() => {

        if (!imgUrl && 'preview' in data) {
            file_service.getPreviewImg(data.preview)
                .then(result => store.setImgUrl(data.name, result))
                .catch(error => console.error('Ошибка промиса', error.message))
        }
    }, [store.fileListUrlImg])


    return (

        <div className='file_item'>
            <div><img src={imgUrl} alt={data.name} width='100px' /></div>
            <div className='file_item__name'>{data.name}</div>
            <div className='file_item__size'>{data.size}</div>
        </div>
    )
}


export default observer(FileItem)