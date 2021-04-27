import axios from 'axios'
import authHeader from '../../services/auth-header';
import authService from '../../services/authService';

const api = axios.create({
    baseURL: 'http://ec2-18-163-80-229.ap-east-1.compute.amazonaws.com:8082/api/vendors/',
})


export const createVendor = payload => api.post(`/MakeVendor`, payload)
export const getAllVendors = () => api.get(`/allVendors`)


const apis = {
    createVendor,
    getAllVendors,
}

export default apis