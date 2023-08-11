import { makeAutoObservable } from 'mobx'
import file_service from '../services/file-service'

export default class Store {

    token: string | null = null
    isLoading = false
    fileList: FileList | File[] | null = null
    fileListUrlImg = new Map()
    fileListMeta = {}
    arrayFileList: File[] | [] = []
    message: string | null | JSX.Element = null
    styleNote = false
    userName = ''
    totalSpace = 0
    usedSpace = 0

    constructor() {
        makeAutoObservable(this)
    }
    setImgUrl = (name: string, url: string) => {
        this.fileListUrlImg.set(name, url)
    }

    getImgUrl = (name: string): string => {
        return this.fileListUrlImg.get(name)
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
        this.styleNote = true
    }
    setStyleNote = (value: boolean): void => {
        this.styleNote = value
    }
    getFreeSpace = (): number => {
        return Number((this.totalSpace - this.usedSpace).toFixed(2))
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

    setUserName = (name: string) => {
        this.userName = name
    }

    setTotalSpace = (value: string) => {
        this.totalSpace = Math.round(Number(value) / 1e9)
    }

    setUsedSpace = (value: string) => {
        this.usedSpace = Number((Number(value) / 1e9).toFixed(2))
    }

    setFileListMeta = (data: object) => {
        this.fileListMeta = data
    }





    async getFileListMeta() {
        const data: object = await file_service.getAllFilesMeta()
        if (data) {
            this.setFileListMeta(data)
        }
    }

    async getDiskInfo() {
        const data = await file_service.getDiskInfo()

        this.setUserName(data.user.display_name)
        this.setTotalSpace(data.total_space)
        this.setUsedSpace(data.used_space)
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

    async init() {
        await this.getDiskInfo()
        await this.getFileListMeta()
    }
}
