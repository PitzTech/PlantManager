import axios from "axios"

const api = axios.create({
	baseURL: "http://192.168.184.1:3333"
})

export default api