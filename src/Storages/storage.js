import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUser = async value => {
  if (value.result === 'success') {
    try {
      const storeData = await AsyncStorage.setItem(
        'user',
        JSON.stringify(value.data),
      );
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
  } catch (e) {
    console.log('gotUser error', e.message);
  }
  return JSON.parse(user);
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
    console.log('done');
    getUser();
  } catch (e) {
    console.log(e.message);
  }
};

// switch (storageKey) {
//   case 'user':
//     const value = JSON.stringify(value.data)
//     break;

//   default:
//     break;
// }
