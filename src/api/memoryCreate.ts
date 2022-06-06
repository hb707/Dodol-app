import axios from 'axios';
import FormData from 'form-data';

axios.defaults.baseURL = 'http://43.200.42.181/api';

interface MemoryPayload {
  c_idx: number;
  m_content?: string;
  m_author?: number;
  memoryImg?: string[];
  music?: string;
}

interface IFormData extends FormData {
  memoryImg?: { name: string; type: string; uri: string }[];
  c_idx?: number;
  m_content?: string;
  m_author?: number;
  music?: string;
}

const memoryCreateAPI = async (payload: MemoryPayload) => {
  const {
    c_idx: cIdx,
    m_author: mAuthor,
    m_content: mContent,
    memoryImg,
    music,
  } = payload;

  // create formData
  const formData: IFormData = new FormData();
  if (memoryImg) {
    memoryImg.forEach(v => {
      const name = v.split('/');
      const fileName = name[name.length - 1];
      formData.append('memoryImg', {
        name: fileName,
        type: 'image/jpeg',
        uri: v,
      });
    });
  }
  formData.append('c_idx', cIdx);
  formData.append('m_content', mContent);
  formData.append('m_author', mAuthor);
  formData.append('music', music);

  try {
    return axios.post('/memory/create', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  } catch (e) {
    return e;
  }
};

export default memoryCreateAPI;
