// action creater = customers
// tidak menggunakan default karena didalam file ada lebih dari satu hal yang akan kita export, kalau satu pakai default
// yang mau di-export tidak hanya onLoginUser

// user = {id : (valuenya), username: (value) }
export let onLoginUser = (user) => {

    // destruct object
    // syntaxnya memang begini
    // nama harus sama dengan yang ada di user
    let {id, username} = user

    // Menyimpan data di localstorage
    // nama userData bisa diganti
    localStorage.setItem('userData', JSON.stringify({id, username}))

    // mengirim data ke redux untuk kemudian disimpan di redux state
    return {
        type: 'LOGIN_SUCCESS',
        payload : {
            id: user.id,
            username : user.username
        }
    }
}

export let onLogoutUser = () => {

    // Menghapus data dari local storage
    localStorage.removeItem('userData')

    // Mengirim data ke redux, untuk menghapus data user yang login dari redux state
    return {
        type: 'LOGOUT_SUCCESS',
        }
    }

export let keepLogin = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: user.id,
            username: user.username
        }
    }
}

