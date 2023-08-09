

const baseURL = 'https://cloud-api.yandex.net/v1'


export const getDiskInfo = async () => {
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
    const result = await Promise.all(responsesUrl.map(r => r.json()))
    const existFiles = result.filter(f => f.message)

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

const file_service = { uploadAll, getDiskInfo }

export default file_service