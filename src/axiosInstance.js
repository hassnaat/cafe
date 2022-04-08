import axios from "axios"

const instance = axios.create({
    baseURL: 'https://afternoon-meadow-26309.herokuapp.com',
});

export default instance