import React from 'react';
import {
  Text,
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
import { READ_R, read_S } from '../Reducers/USERS';
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
  const user: any = getUser();
  setTimeout(() => {
    dispatch(read_S(user._W));
  }, 1000);

  const userInfo = useSelector((state: IState) => state.user);
  console.log(userInfo);

  const requestLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <ImageBackground style={styles.background} source={backImage}>
        {userInfo ? (
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
