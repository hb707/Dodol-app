import React from 'react';
import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import profileIcon2 from '../../../assets/navIcon/IMG_1405.png';
import profileIcon1 from '../../../assets/navIcon/IMG_1406.png';
import addIcon2 from '../../../assets/navIcon/IMG_1407.png';
import addIcon1 from '../../../assets/navIcon/IMG_1410.png';
import listIcon2 from '../../../assets/navIcon/IMG_1411.png';
import listIcon1 from '../../../assets/navIcon/IMG_1413.png';
import homeIcon1 from '../../../assets/navIcon/IMG_1414.png';
import homeIcon2 from '../../../assets/navIcon/IMG_1415.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#ffffff',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    backgroundColor: '#ffffff',
    height: 74,
    width: 74,
    borderRadius: 37,
  },
  homeText: {
    backgroundColor: '#000000',
    height: 60,
    width: 60,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderRadius: 30,
    fontFamily: 'font1',
  },
  navTitle: {
    fontSize: 10,
    color: 'gray',
    fontFamily: 'font1',
  },
  textFont: { fontSize: 12, fontFamily: 'font1', marginTop: 5 },
});

type RootStackParamList = {
  Home: undefined;
  Feed: { sort: 'latest' | 'top' } | undefined;
  Main: undefined;
  List: undefined;
  CreateCapsule: undefined;
  Profile: undefined;
  NavBar: { currentScreen: string } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'NavBar'>;
type NavProps = Props & {
  currentScreen: string;
};

function NavBar({ navigation, currentScreen }: NavProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Main');
        }}
      >
        <Image
          source={currentScreen === 'Main' ? homeIcon2 : homeIcon1}
          style={{ width: 24, height: 24 }}
        />
        <Text style={styles.textFont}>홈</Text>
      </Pressable>
      <Pressable
        style={styles.btn}
        onPress={() => {
          navigation.navigate('List');
        }}
      >
        <Image
          source={currentScreen === 'List' ? listIcon2 : listIcon1}
          style={{ width: 24, height: 24 }}
        />
        <Text style={styles.textFont}>캡슐목록</Text>
      </Pressable>
      <Pressable
        style={styles.btn}
        onPress={() => {
          navigation.navigate('CreateCapsule');
        }}
      >
        <Image
          source={currentScreen === 'Add' ? addIcon2 : addIcon1}
          style={{ width: 24, height: 24 }}
        />
        <Text style={styles.textFont}>추가</Text>
      </Pressable>
      <Pressable
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Profile');
        }}
      >
        <Image
          source={currentScreen === 'Profile' ? profileIcon2 : profileIcon1}
          style={{ width: 24, height: 24 }}
        />
        <Text style={styles.textFont}>프로필</Text>
      </Pressable>
    </View>
  );
}

export default NavBar;
