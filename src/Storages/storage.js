import AsyncStorage from '@react-native-async-storage/async-storage';
import { create_S } from '../Reducers/user';

export const storeUser = async (value, navigation) => {
  if (value.result === 'success') {
    try {
      const storeData = await AsyncStorage.setItem(
        'user',
        JSON.stringify(value.data),
      );
      console.log('스토리이에 유저 정보 저장 성공');
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

export const removeUser = async navigation => {
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
    console.log(e);
  }
};

export const getDataFromStorage = async key => {
  try {
    const data = await JSON.parse(await AsyncStorage.getItem(key));
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
