import AsyncStorage from '@react-native-async-storage/async-storage';
import { create_S } from '../Reducers/user';
import { ILocation } from '../Screens/CLocation';
import { Iuser } from '../types';

export const storeUser = async (value: any) => {
  if (value.result === 'success') {
    try {
      const storeData = await AsyncStorage.setItem(
        'user',
        JSON.stringify(value.data),
      );
      return 'stored';
    } catch (e) {
      console.log(e, '스토어 에러');
      return '';
    }
  } else {
    console.log('카카오 로그인 정보 가져오기 실패');
    return '';
  }
};

export const getData = async (key: string) => {
  try {
    const data: any = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  } catch (e) {
    console.log('gotDataa error', e);
    return e;
  }
};

export const storeData = async (
  key: string,
  value: any,
): Promise<string | void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e, 'store 에러');
  }
};

export const storeSpot = async (value: ILocation): Promise<void> => {
  try {
    await AsyncStorage.setItem('spot', JSON.stringify(value));
  } catch (e) {
    console.log(e, '스토어 스팟 에러');
  }
};

export const getSpot = async (): Promise<ILocation | null> => {
  try {
    const spot: string | null = await AsyncStorage.getItem('spot');
    if (spot === null) throw new Error();
    return JSON.parse(`${spot}`);
  } catch (e) {
    console.log(e, 'getSpot 에러');
    return null;
  }
};

export const removeItemByKey = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e, 'remove storage error');
  }
};

export interface NoAlert {
  value: boolean;
}

export const setDataToStorage = async (key: string, value: NoAlert) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e, `${key} setDataToStorage 에러`);
  }
};
