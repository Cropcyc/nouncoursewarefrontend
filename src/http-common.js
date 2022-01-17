import axios from 'axios'

export default axios.create({
    baseURL: 'https://fierce-inlet-25199.herokuapp.com/#/add',
    headers: {
        'Content-type': 'application/json'
    }
})