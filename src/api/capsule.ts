import FormData from 'form-data';
import axios from 'axios';
import { backUrl, IState } from '../types';

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

export const createAPI = async (payload: IPayload) => {
  console.log('createapi 진입');
  const c_generator = payload.cGenerator.u_idx;
  const {
    // c_thumb: { },
    c_title: cName,
    c_content: cDesc,
    c_location: cLocation,
    c_openAt: cOpenAt,
    c_collaborator: cCollaborator,
  } = payload;
  console.log('name', cName, c_title);

  const dummy = '2023-02-02';
  const formData: IFormData = new FormData();

  // formData.append('c_thumb', {
  //   name,
  //   type,
  //   uri
  // });
  formData.append('c_generator', c_generator);
  formData.append('c_title', cName);
  formData.append('c_content', cDesc);
  formData.append('c_location', cLocation);
  formData.append('c_collaborator', cCollaborator);
  formData.append('c_openAt', dummy);
  let response;
  try {
    console.log(formData);
    response = await axios.post(`${backUrl}/api/capsule/create`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    if (response.data.result === 'fail') throw new Error('에러');
  } catch (error) {
    console.log(response.data.error);
  }
  return response.data;
};
