import AsyncStorage from '@react-native-async-storage/async-storage';
import { create_S } from '../Reducers/user';
import { ILocation } from '../Screens/CLocation';

export const storeUser = async (value, navigation) => {
  if (value.result === 'success') {
    try {
      const storeData = await AsyncStorage.setItem(
        'user',
        JSON.stringify(value.data),
      );
      navigation.navigate('Home', { isLogin: true });
    } catch (e) {
      console.log(e, '스토어 에러');
    }
  } else {
    console.log('카카오 로그인 정보 가져오기 실패');
  }
};

export const getUser = async () => {
  let user;
  try {
    user = await AsyncStorage.getItem('user');
  } catch (e) {
    console.log('gotUser error', e.message);
  }
  return JSON.parse(user);
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
    console.log('removed');
  } catch (e) {
    console.log(e.message);
  }
};

export const storeCapsule = async value => {
  try {
    await AsyncStorage.setItem('@capsule_item', JSON.stringify(value));
  } catch (e) {
    console.log(e, 'storeCapsule 에러');
  }
};

export const storeThumb = async (value: string): Promise<string | void> => {
  try {
    const storeData = await AsyncStorage.setItem(
      'thumbUrl',
      JSON.stringify(value),
    );
    console.log('thumb 스토리지에 저장');
    // navigation.navigate('Home', { isLogin: true });
  } catch (e) {
    console.log(e, 'storeThumb 에러');
  }
};

export const getThumb = async (): Promise<string | null> => {
  try {
    const thumbUrl: string | null = await AsyncStorage.getItem('thumbUrl');
    return thumbUrl;
  } catch (e) {
    console.log(e, 'getThumb 에러');
    return null;
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

export const getDataFromStorage = async key => {
  try {
    const data = await JSON.parse(await AsyncStorage.getItem(key));
    return data;
  } catch (e) {
    console.log(e, 'getDataFromStorage 에러');
    return e;
  }
};

export const removeItemByKey = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e, 'remove storage error');
  }
};

export const setDataToStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e, `${key} setDataToStorage 에러`);
  }
};
