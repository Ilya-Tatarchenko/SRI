import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios
      .post(API_URL + 'signup', {
        gender: user.gender,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        password: user.password,
        organisationsCode: user.organisationsCode
      })
  }
}

export default new AuthService();