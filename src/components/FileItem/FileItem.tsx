import { observer } from 'mobx-react'
import { FileItemProps } from '../../types'

interface Props {
    data: FileItemProps
}

const FileItem = ({ data }: Props) => {

    const iconUrl = ('preview' in data) ? data.preview : ''

    return (
        <div className='file_item'>
            <div><img src={iconUrl} referrerPolicy='unsafe-url' alt=""  /></div>
            <div>{data.name}</div>
            <div>{data.size}</div>
        </div>
    )
}


export default observer(FileItem)