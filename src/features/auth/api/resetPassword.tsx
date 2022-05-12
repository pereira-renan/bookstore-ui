import axios from 'axios';
import { API_URL } from '@/config';

export const resetPassword = (
  requestUserId: string,
  requestCode: string,
  requestNewPassword: string
) => {
  const body = { user: requestUserId, code: requestCode, newPassword: requestNewPassword };
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios
    .post(`${API_URL}/Api/Authenticate/ConfirmNewPassword`, body, { headers })
    .catch((err) => {
      return err.response;
    })
    .then((response) => {
      return response;
    });
};
