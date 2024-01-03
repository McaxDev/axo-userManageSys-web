import CryptoJS from 'crypto-js'

const pasenc=function(pas){
    return CryptoJS.SHA256(pas).toString()
}

export default pasenc