import axios from "axios"

const api = axios.create({
	baseURL: "https://6addc9e30715.ngrok.io"
	//baseURL: "http://localhost:3333"
})

export default api
