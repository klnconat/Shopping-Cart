import axios from 'axios';

export default {
    get(resource){
        return axios.get(resource);
    }
}