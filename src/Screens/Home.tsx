import React, { useState, useEffect } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { getUser } from '../Storages/storage';
import { read_S } from '../Reducers/user';
import JarImage from '../../assets/Home/dodol.png';
import loginBtn from '../../assets/Home/kakao_login_medium_wide.png';

const screen = Dimensions.get('screen');
const { fontScale } = screen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: screen.height * 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    flex: 0.3,
    top: screen.width * 0.3,
    left: screen.width * -0.2,
    fontSize: fontScale * 40,
    fontFamily: 'font3',
  },
  jar: {
    top: screen.width * 0.05,
    flex: 0.3,
    aspectRatio: 0.58,
  },
  btnBox: {
    bottom: screen.width * 0.1,
    flex: 0.1,
    width: 300,
    position: 'relative',
  },
  loginBtn: {
    position: 'absolute',
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

  const sendUser = async () => {
    const user = await getUser();
    if (user) {
      dispatch(read_S(user));
    }
  };

  if (route.params) {
    sendUser();
  }

  useEffect(() => {
    sendUser();
  });

  const requestLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.background}>
      <Text style={styles.line}>
        오래도록
        {'\n'}
        기억하고 싶은
        {'\n'}
        소중한 추억
        {'\n'}
        {'\n'}
        DoDol과 함께
      </Text>
      <Image style={styles.jar} source={JarImage} resizeMode="cover" />
      <Pressable onPress={requestLogin} style={styles.btnBox}>
        <Image source={loginBtn} style={styles.loginBtn} />
      </Pressable>
    </View>
  );
}

export default HomeScreen;
