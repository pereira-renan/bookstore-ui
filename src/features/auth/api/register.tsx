import axios from 'axios';
import { API_URL } from '@/config';

export const registerWithEmailAndPassword = (
  requestUsername: string,
  requestEmail: string,
  requestPassword: string
) => {
  const body = { username: requestUsername, email: requestEmail, password: requestPassword };
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios
    .post(`${API_URL}/Api/Authenticate/Register`, body, { headers })
    .catch((err) => {
      return err.response;
    })
    .then((response) => {
      return response;
    });
  // const data = await axios
  //   .post(`${API_URL}/Api/Authenticate/Register`, body, { headers })
  //   .catch((err) => {
  //     return { data: { status: err.response.status, message: err.response.data.message } };
  //   })
  //   .then((res) => {
  //     return res;
  //   });
};
