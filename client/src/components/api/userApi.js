import axios from 'axios'
import authHeader from '../../services/auth-header';
import authService from '../../services/authService';

const api = axios.create({
    baseURL: 'http://ec2-18-163-80-229.ap-east-1.compute.amazonaws.com:8082/api/users/',
})


export const getAllUsers = () => api.get(`/getUsers`)
export const getUserOrders = () => api.get(`/myOrders`, {headers: authHeader()})


const apis = {
    getAllUsers,
    getUserOrders,
}

export default apis