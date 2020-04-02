

// Reducer / divisi
// urutan parameter tidak boleh tertukar
// biasanya menggunakan switch case

// jika ingin engambil data bisa langsung dari global state(brankas), namun, ketika akan mengubah atau mengirim data harus melalui reducer terlebih dahulu

// init hanya akan jalan sekali, saat sudah berjalan tidak akan jalan lagi
let init = {
    id:"",
    username: ""
}

// kita bisa memasukkan nilai default kedalam parameter dengan cara seperti state dibawah
export default (state = init, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return {...state, id : action.payload.id, username : action.payload.username}
        case 'LOGOUT_SUCCESS':
            return {...state, id: "", username : ""}
        default :
            return state
    }

}


// let action = {
//     type : 'LOGIN_SUCCESS',
//     payload : {
//         id: "1",
//         username : rochafi
//     }
// }