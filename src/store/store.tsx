import { makeAutoObservable } from 'mobx'
import file_service from '../services/file-service'

export default class Store {

    token: string | null = null
    isLoading = false
    fileList: FileList | File[] | null = null
    arrayFileList: File[] | [] = []
    message: string | null | JSX.Element = null
    styleNote = ''
    userName = ''
    totalSpace = 0
    usedSpace = 0

    constructor() {
        makeAutoObservable(this)
    }

    setToken = (token: string | null): void => {
        this.token = token
    }

    setIsLoading = (value: boolean): void => {
        this.isLoading = value
    }

    setFileList = (arr: File[] | FileList | null): void => {
        this.fileList = arr
    }

    setMessage = (message: JSX.Element | string | null): void => {
        this.message = message
    }
    setStyleNote = (style: string): void => {
        this.styleNote = style
    }
    getFreeSpace = (): number => {
        return this.totalSpace - this.usedSpace
    }

    setClearUserInfo = (): void => {
        this.userName = ''
        this.totalSpace = 0
        this.usedSpace = 0
    }

    getLoaderPercent = (): number => {
        return this.totalSpace / 100 * this.usedSpace
    }

    removeOneFromList = (name: string): void => {
        if (this.fileList) {
            this.setFileList(Array.from(this.fileList).filter(f => f.name !== name))
        }
    }

    async setDiskInfo() {
        const data = await file_service.getDiskInfo()
        this.userName = data.user.display_name
        this.totalSpace = Math.round(data.total_space / 1e9)
        this.usedSpace = Number((data.used_space / 1e9).toFixed(2))
    }

    async uploadAllFiles(files: File[]) {

        try {
            this.setIsLoading(true)

            const existFiles = await file_service.uploadAll(files)

            // Проверка существующих файлов 
            if (existFiles && existFiles.length > 0) {

                const messageList = existFiles.map(m =>
                    m.message.slice(7, -16))
                this.setMessage(<div>
                    Невозможно выполнить. <br />
                    Файлы с таким именем уже существуют на диске:
                    <ul className='messagelist'>
                        {messageList.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                </div>)
                return
            }
            this.setMessage('Все файлы успешно загружены.')
        } catch (error) {
            if (error instanceof Error) {
                this.setMessage(error.message)
            }
        } finally {
            //    aRef.current.value = null;
            this.setFileList(null)
            this.setIsLoading(false)
        }
    }




}
