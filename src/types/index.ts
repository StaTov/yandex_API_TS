
 interface FileItem {
        name: string
        file: string
        preview: string
        size: number 
}

 type FileItemNoPreview = Omit<FileItem, 'preview'>

export type FileItemProps = FileItemNoPreview | FileItem