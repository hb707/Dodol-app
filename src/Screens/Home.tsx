import React, { useEffect } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import type { NativeStackScreenProps } from 'react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../Components/NavBar/NavBar';
import { getUser } from '../Storages/storage';
import { read_S } from '../Reducers/USERS';
import { IState } from '../types';
import backImage from '../../assets/Home/jar1.jpg';
import kakaoLogin from '../../assets/Home/kakao_login_medium_narrow.png';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loggedIn: {
    alignItems: 'center',
    marginLeft: '25%',
    marginBottom: '5%',
  },
  kakaologin: {
    alignItems: 'center',
    marginLeft: '25%',
    marginBottom: '5%',
  },
  navBar: {
    flex: 0.1,
  },
});

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function HomeScreen({ navigation, route }: Props) {
  const dispatch = useDispatch();
  let user: any;

  const manageUser = async () => {
    // dispatch = await useDispatch();
    user = await getUser();
    if (user !== null) {
      dispatch(read_S(user));
      await navigation.navigate('Home');
    }
  };

  const isLogin = useSelector((state: IState) => state.user.isLogin);
  console.log('로그인 여부 :', isLogin);
  if (!isLogin) {
    manageUser();
  }

  // useEffect(() => {
  //   if (!isLogin) {
  //     manageUser();
  //   } else {
  //     console.log('1')
  //   }
  // }, [isLogin])

  const requestLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <ImageBackground style={styles.background} source={backImage}>
        {isLogin ? (
          <View style={styles.loggedIn} />
        ) : (
          <Pressable onPress={requestLogin}>
            <Image source={kakaoLogin} style={styles.kakaologin} />
          </Pressable>
        )}
      </ImageBackground>
      <View style={styles.navBar}>
        <NavBar navigation={navigation} route={route} />
      </View>
    </>
  );
}

export default HomeScreen;
