import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://ec2-18-163-80-229.ap-east-1.compute.amazonaws.com:8082/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL);
  }

  getAdminBoard() {
    return axios.get(API_URL + 'api/users/current', { headers: authHeader() });
  }
}

export default new UserService();
