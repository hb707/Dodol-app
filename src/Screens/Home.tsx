import React from 'react';
import { View, Pressable, StyleSheet, Image } from 'react-native';
import type { NativeStackScreenProps } from 'react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { getUser } from '../Storages/storage';
import { read_S } from '../Reducers/user';
import logo from '../../assets/Home/dodol.png';
import backImage from '../../assets/Home/jar.png';
import loginBtn from '../../assets/Home/kakao_login_medium_wide.png';


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jarBox: {
    top: 30,
    flex: 0.5,
  },
  jar: {
    width: 220,
    height: 380,
  },
  logo: {
    width: 120,
    height: 140,
    position: 'absolute',
    top: 170,
    left: 50,
  },
  loginBtn: {
    bottom: -50,
  },
});

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function HomeScreen({ navigation, route }: Props) {
  const sendUser = async () => {
    const dispatch = useDispatch();
    const user = await getUser();
    dispatch(read_S(user));
  };

  if (route.params) {
    sendUser();
  }

  const requestLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.background}>
      <View style={styles.jarBox}>
        <Image style={styles.jar} source={backImage} />
        <Image source={logo} style={styles.logo} />
      </View>
      <Pressable onPress={requestLogin}>
        <Image source={loginBtn} style={styles.loginBtn} />
      </Pressable>
    </View>
  );
}

export default HomeScreen;
