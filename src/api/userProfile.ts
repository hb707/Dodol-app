import axios from 'axios';
import { UserIndex } from '../actions/userProfile';

axios.defaults.baseURL = 'http://43.200.42.181/api';

export const updateAPI = (payload: UserIndex) => {
  try {
    return axios.post('/user/editAlias', payload);
  } catch (e) {
    return e;
  }
};

export const quitAPI = () => {
  console.log('first');
};
