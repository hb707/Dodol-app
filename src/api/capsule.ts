import FormData from 'form-data';
import axios from 'axios';
import { backUrl, IState } from '../types';
import { getUser } from '../Storages/storage';

export interface IPayload {
  c_generator: object;
  c_title: string;
  c_content: string;
  c_location: string;
  c_openAt: Date;
  c_collaborator: [];
  c_thumb: object;
}

interface IFormData extends FormData {
  c_thumb: {
    name: string;
    type: string;
    uri: string;
  }[];
  c_generator: number;
  c_title: string;
  c_content: string;
  c_location: string;
  c_openAt: Date;
  c_collaborator: [];
}

export const readAPI = async () => {
  const { u_idx } = await getUser();
  try {
    const response = await axios.post(`${backUrl}/api/capsule/list`, { u_idx });
    if (!response.data) {
      throw new Error('데이터 없음');
    } else {
      console.log('잘 가져옴');
    }
  } catch (error) {
    console.log('에러');
  }
};

export const createAPI = async (payload: IPayload) => {
  const c_generator = payload.cGenerator.u_idx;
  const {
    // c_thumb: { },
    cName: c_title,
    cDesc: c_content,
    cLocation: c_location,
    cOpenAt: c_openAt,
    cCollaborator: c_collaborator,
  } = payload;

  const dummy = '2023-02-02';
  const formData: IFormData = new FormData();

  // formData.append('c_thumb', {
  //   name,
  //   type,
  //   uri
  // });
  formData.append('c_generator', c_generator);
  formData.append('c_title', c_title);
  formData.append('c_content', c_content);
  formData.append('c_location', c_location);
  formData.append('collaborator', [
    // "u_alias": "김지현",
    // "u_id": "2162408755"
    5,
  ]);
  formData.append('c_openAt', dummy);
  let response;
  try {
    // console.log(formData)
    // //2162408755
    // const response2 = await axios.post(`${backUrl}/api/user/search`, { u_id: 2162408755 })
    // console.log(response2.data)

    response = await axios.post(`${backUrl}/api/capsule/create`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    if (response.data.result === 'fail') throw new Error('에러');
  } catch (error) {
    console.log(response.data.error);
  }
  return response.data;
};
