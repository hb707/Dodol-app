import FormData from 'form-data';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { backUrl, IState, Iuser } from '../types';
import { getUser } from '../Storages/storage';
import { CapsuleIdx } from '../Sagas/capsuleSaga';
import { ILocation } from '../Screens/CLocation';
import { create_S } from '../Reducers/capsule';

export interface IPayload {
  c_generator: Iuser;
  c_title: string;
  c_content: string;
  c_location: ILocation | null;
  c_openAt: string;
  c_collaborator: number[];
  c_thumb: string | null;
}

interface IFormData extends FormData {
  capsuleImg?: {
    name: string;
    type: string;
    uri: string;
  };
  c_generator?: number;
  c_title?: string;
  c_content?: string;
  c_location?: string;
  c_openAt?: string;
  c_collaborator?: number[];
}

export const readAPI = async () => {
  const { u_idx } = await getUser();
  try {
    const response = await axios.post(`${backUrl}/api/capsule/list`, {
      u_idx,
    });
    return response;
  } catch (error) {
    console.log('에러');
    return error;
  }
};

export const createAPI = async (
  payload: IPayload,
): Promise<AxiosResponse<any> | null> => {
  const c_generator = payload.c_generator.u_idx;
  if (payload.c_thumb === null) return null;
  if (payload.c_location === null) return null;

  const uri: string = payload.c_thumb.replace(/[\\]/g, '').replace(/["]/g, '');
  const name = payload.c_thumb.split('/');
  const fileName = name[name.length - 1];

  // const c_thumb =

  const {
    c_title,
    c_content,
    c_location,
    c_openAt,
    // c_collaborator,
  } = payload;

  const formData: IFormData = new FormData();
  formData.append('c_generator', c_generator);
  formData.append('c_title', c_title);
  formData.append('c_content', c_content);
  formData.append(
    'c_location',
    `${c_location.longitude},${c_location.latitude}`,
  );
  formData.append('collaborator', 5);
  formData.append('collaborator', 6);

  formData.append('c_openAt', '2022-06-01');

  formData.append('capsuleImg', {
    name: fileName,
    type: 'image/jpeg',
    uri,
  });

  let response = null;
  try {
    response = await axios.post(`${backUrl}/api/capsule/create`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    console.log('capsuleapi', response.data);
    if (response.data.result === 'fail') throw new Error('에러');
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const openAPI = async (payload: CapsuleIdx) => {
  const response = await axios.post(`${backUrl}/api/capsule/open`, payload);
  return response;
};
