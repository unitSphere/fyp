import axios from "axios";

const API_URL = "http://ec2-18-163-80-229.ap-east-1.compute.amazonaws.com:8082/api/users/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, role, email, password, password2) {
    return axios.post(API_URL + "register", {
      name,
      role,
      email,
      password,
      password2
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
