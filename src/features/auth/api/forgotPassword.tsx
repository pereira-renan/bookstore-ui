import axios from 'axios';
import { API_URL } from '@/config';

export const forgotPassword = (requestEmail: string) => {
  const body = { email: requestEmail };
  console.log(body);
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios
    .post(`${API_URL}/Api/Authenticate/ResetPassword`, body, { headers })
    .catch((err) => {
      return err.response;
    })
    .then((response) => {
      return response;
    });
};
