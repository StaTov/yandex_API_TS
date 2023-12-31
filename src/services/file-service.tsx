

const baseURL = 'https://cloud-api.yandex.net/v1'


const getAllFilesMeta = async () => {
    const token = localStorage.getItem('access_token')
    if (!token) {
        throw new Error('Недостаточно прав. Необходима авторизация.')
    }
    const response = await fetch(`${baseURL}/disk/resources/files`, {
        headers: {
            Accept: 'application/json',
            Authorization: `OAuth ${token}`
        }
    })
    if (response.ok) {
        const data = await response.json()
        return data
    }
    throw new Error(`ошибка сети + ${response.status}`)
}

const getPreviewImg = async (url: string) => {
    const token = localStorage.getItem('access_token')
    if (!token) {
        throw new Error('Недостаточно прав. Необходима авторизация.')
    }
    console.log('url', url)
    const response = await fetch(url, {
        headers: {
            Accept: '*/*',
            Authorization: `OAuth ${token}`,
        }
    })
    if (response.ok) {
        const blob = await response.blob()
        return URL.createObjectURL(blob)
    }
    throw new Error('Неизвестная ошибка')

}


const getDiskInfo = async () => {
    const token = localStorage.getItem('access_token')
    if (!token) {
        throw new Error('Недостаточно прав. Необходима авторизация.')
    }
    const response = await fetch(`${baseURL}/disk/`, {
        headers: {
            Accept: 'application/json',
            Authorization: `OAuth ${token}`
        }

    })
    if (response.ok) {
        const data = await response.json()
        return data
    }
    throw new Error(`ошибка сети + ${response.status}`)
}


const uploadAll = async (files: File[]) => {

    if (!files || files.length < 1) {
        throw new Error('Отсутствуют файлы для загрузки')
    }

    const token = localStorage.getItem('access_token')
    if (!token) {
        throw new Error('Недостаточно прав. Необходима авторизация.')
    }
    const responsesUrl = await Promise.all(files.map(f =>
        fetch(`${baseURL}/disk/resources/upload?path=${encodeURIComponent(f.name)}`, {
            headers: {
                Accept: '*/*',
                Authorization: `OAuth ${token}`
            }
        }
        )))
    // console.log('responseURlr', responsesUrl)
    const result = await Promise.all(responsesUrl.map(r => r.json()))
    const existFiles = result.filter(f => f.message)
    //  console.log('result', result)
    if (existFiles.length > 0) {
        return existFiles
    }

    await Promise.all(files.map((f, i) =>
        fetch(`${result[i].href}`, {
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'content-type': f.type,
                'content-length': `${f.size}`,
            },
            body: f,
        })))

}

const file_service = { uploadAll, getDiskInfo, getAllFilesMeta, getPreviewImg }

export default file_service