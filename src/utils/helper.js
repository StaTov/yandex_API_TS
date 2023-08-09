
export const yandexInit = (setToken) => {
    return window.YaAuthSuggest.init({
        client_id: '6aca6dec88d8442ea6c17e9604731b74',
        response_type: 'token',
        redirect_uri: 'https://beamish-frangipane-5392d4.netlify.app/empty'
    },
    'https://beamish-frangipane-5392d4.netlify.app/', {
        view: 'button',
        parentId: 'yaBtn',
        buttonView: 'main',
        buttonTheme: 'light',
        buttonSize: 'm',
        buttonBorderRadius: 0
    }
    )
        .then(function (result) {
            return result.handler()
        })
        .then(function (data) {
            localStorage.setItem('access_token', data.access_token)
            setToken(data.access_token)

        })
        .catch(function (error) {
            console.log('Что-то пошло не так: ', error)
            
        })
}


export function yandexToken() {
    window.YaSendSuggestToken('https://beamish-frangipane-5392d4.netlify.app/', {
        'kek': true
    })
    
}