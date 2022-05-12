import axios from 'axios';

async function getApiCallResponse(url: string) {
  const headers = {
    'Content-Type': 'application/json',
  };
  const response = await axios.get(url, {
    headers,
  });
  console.log(response.data);
}

async function postApiCallResponse(url: string, body: any) {
  const headers = {
    'Content-Type': 'application/json',
  };
  const response = axios.post(url, body, {
    headers,
  });
  console.log(response);
}

export { getApiCallResponse, postApiCallResponse };
