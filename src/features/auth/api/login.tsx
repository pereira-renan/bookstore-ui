import axios from 'axios';
import { API_URL } from '@/config';

export const loginWithEmailAndPassword = (requestUsername: string, requestPassword: string) => {
  const body = { username: requestUsername, password: requestPassword };
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios
    .post(`${API_URL}/Api/Authenticate/Login`, body, {
      headers,
    })
    .catch((err) => {
      return err.response;
    })
    .then((response) => {
      return response;
    });
};
