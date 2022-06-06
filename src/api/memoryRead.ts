import axios from 'axios';

axios.defaults.baseURL = 'http://43.200.42.181/api';

const memoryReadAPI = async (payload: { c_idx: number }) => {
  try {
    return axios.post('/memory/list', payload);
  } catch (e) {
    return e;
  }
};

export default memoryReadAPI;
