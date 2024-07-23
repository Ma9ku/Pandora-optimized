import axios from "axios";

const API_URL = "http://10.202.20.92:9091/api/finpol/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("email", response.data.username);
          localStorage.setItem("auth_user_id", response.data.id);
          console.log(localStorage.getItem('jwtToken'));
          console.log(localStorage.getItem('auth_user_id'));
          
          
          
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, FIO, password, level, user_photo) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      FIO,
      password,
      level,
      user_photo
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
