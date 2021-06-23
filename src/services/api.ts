import axios from "axios"

const api = axios.create({
	//baseURL: "https://26712aedc569.ngrok.io/"
	baseURL: "http://localhost:3333"
})

export default api
