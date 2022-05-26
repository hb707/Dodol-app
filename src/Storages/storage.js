import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { create_S } from '../Reducers/USERS';

export const storeUser = async (value, navigation) => {
  if (value.result === 'success') {
    try {
      const storeData = await AsyncStorage.setItem(
        'user',
        JSON.stringify(value.data),
      );
      // 스토리지에서 유저 정보 가져와서 값이 있으면 디스패치로 전역 상태 설정
      // const dispatch=useDispatch();
      //   const user = getUser()
      //   dispatch(create_S(user));
      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log('카카오 로그인 정보 가져오기 실패');
  }
};

export const getUser = async () => {
  let user;
  try {
    user = await AsyncStorage.getItem('user');
    console.log('got userInfo');
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
