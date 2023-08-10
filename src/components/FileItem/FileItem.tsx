import { observer } from 'mobx-react'
import { FileItemProps } from '../../types'

interface Props {
    data: FileItemProps
}

const FileItem = ({ data }: Props) => {

    const iconUrl = ('preview' in data) ? data.preview : ''
    return (
        <div className='file_item'>
            <div><img src={iconUrl} alt={data.name} width='100px' /></div>
            <div className='file_item__name'>{data.name}</div>
            <div className='file_item__size'>{data.size}</div>
        </div>
    )
}


export default observer(FileItem)