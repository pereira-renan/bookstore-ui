import axios from 'axios';
import { API_URL } from '@/config';

export const showBookDetails = (id: string) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios
    .get(`${API_URL}/Api/Books/ShowDetails?id=${id}`, { headers })
    .catch((err) => {
      return err.response;
    })
    .then((response) => {
      return response;
    });
  // const data = await axios
  //   .get(`${API_URL}/Api/Books/ShowDetails?id=${id}`, { headers })
  //   .catch((err) => {
  //     return { data: { status: err.response.status, message: err.response.data.message } };
  //   })
  //   .then((res) => {
  //     return res;
  //   });
};
