import axios from 'axios';
import { SearchPayload } from '../actions/userSearch';

axios.defaults.baseURL = 'http://43.200.42.181/api';

const searchAPI = async (code: string) => {
  const payload: SearchPayload = { u_id: code };
  try {
    const response = await axios.post('/user/search', payload);
    return response.data;
  } catch (e) {
    return e;
  }
};

export default searchAPI;
