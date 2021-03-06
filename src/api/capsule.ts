import FormData from 'form-data';
import axios, { AxiosResponse } from 'axios';
import { backUrl, Iuser } from '../types';
import { getData } from '../Storages/storage';
import { CapsuleIdx } from '../Sagas/capsuleSaga';
import { ILocation } from '../Screens/CLocation';

export interface IPayload {
  c_generator: Iuser;
  c_title: string;
  c_content: string;
  c_location: ILocation | null;
  c_openAt: string;
  c_collaborator: Iuser[];
  c_thumb: string | null;
}

export interface CapsuleCreateSuccessPayload {
  c_generator: Iuser;
  c_title: string;
  c_content: string;
  c_location: ILocation | null;
  c_openAt: string;
  c_collaborator: Iuser[];
  c_thumb: string | null;
  c_idx: number;
  c_createdAt: Date;
  isOpened: boolean;
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
  const { u_idx } = await getData('user');
  try {
    const response = await axios.post(`${backUrl}/api/capsule/list`, {
      u_idx,
    });
    return response;
  } catch (error) {
    console.log('api/capsule error');
    return error;
  }
};

export const createAPI = async (payload: IPayload) => {
  const c_generator = payload.c_generator.u_idx;

  const { c_title, c_content, c_openAt, c_collaborator } = payload;
  const c_location = payload.c_location as ILocation;

  const formData: IFormData = new FormData();
  c_collaborator.forEach(v => formData.append('collaborator', v.u_idx));
  formData.append('c_generator', c_generator);
  formData.append('c_title', c_title);
  formData.append('c_content', c_content);
  formData.append(
    'c_location',
    `${c_location.latitude},${c_location.longitude},${
      c_location.cAddress || '퇴계로'
    }`,
  );
  formData.append('c_openAt', c_openAt);

  if (payload.c_thumb !== null) {
    const uri: string = payload.c_thumb
      .replace(/[\\]/g, '')
      .replace(/["]/g, '');
    const name = payload.c_thumb.split('/');
    const fileName = name[name.length - 1];
    formData.append('capsuleImg', {
      name: fileName,
      type: 'image/jpeg',
      uri,
    });
  }
  try {
    return await axios.post(`${backUrl}/api/capsule/create`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  } catch (error) {
    return error;
  }
};

export const openAPI = async (payload: CapsuleIdx) => {
  const response = await axios.post(`${backUrl}/api/capsule/open`, payload);
  return response;
};
