import axios from 'axios'

const api = axios.crate({
    baseURL: 'http://192.168.0.7:3333'
})

export default api