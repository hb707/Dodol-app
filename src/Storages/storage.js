import AsyncStorage from '@react-native-async-storage/async-storage';
import { create_S } from '../Reducers/user';

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

export const removeUser = async navigation => {
  try {
    await AsyncStorage.removeItem('user');
    console.log('removed');
  } catch (e) {
    console.log(e.message);
  }
};

export const storeCapsule = async (value) => {
  try {
    await AsyncStorage.setItem(
      '@capsule_item',
      JSON.stringify(value)
    );
  } catch (e) {
    console.log(e);
  }
};

// export const getCapsule = async () => {
//   try {
//     const data = await JSON.parse(await AsyncStorage.getItem('@capsule_item'));
//     return data;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };

export const storeThumb = async (value) => {
  try {
    const storeData = await AsyncStorage.setItem(
      'thumbUrl',
      JSON.stringify(value),
    );
    console.log('thumb 스토리지에 저장');
    // navigation.navigate('Home', { isLogin: true });
  } catch (e) {
    console.log(e, '스토어 에러');
  }
};

export const getThumb = async (value) => {
  let thumbUrl;
  try {
    thumbUrl = await AsyncStorage.getItem(
      'thumbUrl',
    );
    // navigation.navigate('Home', { isLogin: true });
  } catch (e) {
    console.log(e, 'getThumb 에러');
  }
  return JSON.parse(`${thumbUrl}`);
};