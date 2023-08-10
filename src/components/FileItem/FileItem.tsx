import { observer } from 'mobx-react'
import { FileItemProps } from '../../types'
import file_service from '../../services/file-service'
import { useEffect, useState } from 'react'



interface Props {
    data: FileItemProps
}

const FileItem = ({ data }: Props) => {

    const [url, setUrl] = useState('')

    useEffect(() => {
        if ('preview' in data) {
            console.log('dp', data.preview)
            file_service.getPreviewImg(data.preview)
                .then(result =>{console.log(result); setUrl(result)})
                .catch(error => console.log('arror', error))
        }
    }, [])

    return (

        <div className='file_item'>
            <div><img src={url} alt={data.name} width='100px' /></div>
            <div className='file_item__name'>{data.name}</div>
            <div className='file_item__size'>{data.size}</div>
        </div>
    )
}


export default observer(FileItem)