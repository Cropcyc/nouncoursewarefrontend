import axios from 'axios'

export default axios.create({
    baseURL: 'https://fierce-inlet-25199.herokuapp.com/api/courses',
    headers: {
        'Content-type': 'application/json'
    }
})