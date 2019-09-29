import axios from 'axios'

/* DogAPI service */axios
export default {
    async getBreedsList() {
        const response = await axios.get('/breeds/list/all')
        return response.data
    },
    async getBreedImages(breed) {
        const response = await axios.get('/breed/' + breed + '/images')
        return response.data
    },
    async getSubBreeds(breed) {
        const response = await axios.get('/breed/' + breed + '/list')
        return response.data
    }
}