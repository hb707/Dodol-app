import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';
import type { NativeStackScreenProps } from 'react-navigation/native-stack';
import NavBar from '../Components/NavBar/NavBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kakaologin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    flex: 0.1,
  },
  text: {
    color: 'red',
    fontSize: 200,
    justifyContent: 'center',
  },
});

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
function HomeScreen({ navigation, route }: Props) {
  const requestLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={requestLogin}>
          <Text onPress={requestLogin} style={styles.text}>
            hey
          </Text>
          <ImageBackground
            style={styles.kakaologin}
            source={{
              uri: '/Users/ivy/Documents/workspace/2022/React/20220521/my-project/kakao_login_medium_narrow.png',
            }}
            resizeMode="cover"
          />
        </Pressable>
      </View>
      <View style={styles.navBar}>
        <NavBar navigation={navigation} route={route} />
      </View>
    </>
  );
}

export default HomeScreen;
