import axios from 'axios';
const url = 'http://localhost:5000/api/';

const AuthService = {
  login(credentials) {
    return axios
      .post(url + 'login/', credentials)
      .then((response) => response.data);
  },
  signUp(credentials) {
    return axios
      .post(url + 'sign-up/', credentials)
      .then((response) => response.data);
  },
  getSecretContent(token) {
    return axios
      .get(url + 'secret-route/', {
        headers: {
          authorization: token,
        },
      })
      .then((response) => response.data);
  },
  logOut(token) {
    return axios
      .post(url + 'logout/', {
        headers: {
          authorization: token,
        },
      })
      .then((response) => response.data);
  },
};

export default AuthService;
