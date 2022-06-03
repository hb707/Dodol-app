/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import NavBar from '../Components/NavBar/NavBar';
import defaultPic from '../../assets/default_capsule_thumbnail.png';
import { IState } from '../types';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
  MemoryList: { cIdx: number | null };
  OpenCapsule: { cIdx: number | null };
};

type Props = NativeStackScreenProps<RootStackParamList>;

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  itemContainer: {
    width: screenWidth,
    borderBottomColor: '#aeaeae',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  img: {
    width: 0.3 * screenWidth,
    height: 0.3 * screenWidth,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  textDiv: {
    width: 0.55 * screenWidth,
    height: 0.3 * screenWidth,
    justifyContent: 'space-between',
  },
  container: {
    paddingVertical: 30,
    backgroundColor: '#15106b',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  test_text: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'font1',
    marginTop: 30,
  },
  cngBtn: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    paddingVertical: 7,
    width: 120,
    borderRadius: 10,
    alignItems: 'center',
  },
});

function CapsuleListScreen({ navigation }: Props) {
  const [onlyOpened, setOnlyOpened] = useState<boolean>(true);
  const capsuleList = useSelector((state: IState) => state.capsule.capsule);
  const openedCapsuleList = capsuleList.filter(v => v.isOpened);
  const list = onlyOpened ? openedCapsuleList : capsuleList;

  const item = () =>
    list.map(v => (
      <Pressable
        style={styles.itemContainer}
        onPress={() => {
          // eslint-disable-next-line no-unused-expressions
          v.isOpened
            ? navigation.navigate('MemoryList', { cIdx: v.c_idx })
            : navigation.navigate('OpenCapsule', { cIdx: v.c_idx })
        }}
        key={v.c_idx}
      >
        <Image
          source={
            v.c_thumb
              ? {
                uri: `http://43.200.42.181/upload/${v.c_thumb}`,
              }
              : defaultPic
          }
          style={styles.img}
        />
        <View style={styles.textDiv}>
          <Text style={{ fontSize: 18, fontFamily: 'font1' }}>{v.c_title}</Text>
          <Text style={{ fontSize: 14, fontFamily: 'font1' }}>
            {v.c_content && v.c_content.length > 40
              ? `${v.c_content.substring(0, 41)}...`
              : v.c_content}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="md-people" size={20} color="black" />
              <Text style={{ marginLeft: 5, fontFamily: 'font1' }}>
                {v.c_collaborator.length + 1}명
              </Text>
            </View>
            <Text style={{ color: '#666', fontFamily: 'font1' }}>
              {JSON.stringify(v.c_openAt).substring(1, 11)}
            </Text>
          </View>
        </View>
      </Pressable >
    ));

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 12, justifyContent: 'center' }}>
        <ScrollView>
          <View
            style={{
              width: screenWidth,
              backgroundColor: '#cecece',
              borderBottomWidth: 1,
              borderBottomColor: '#aeaeae',
            }}
          >
            <LinearGradient
              style={styles.container}
              colors={['#aeaeae', '#eee', '#ffffff']}
            >
              <Text style={{ ...styles.test_text, fontFamily: 'font1', }}>캡슐 리스트</Text>
              <Pressable
                onPress={() => {
                  setOnlyOpened(!onlyOpened);
                }}
                style={{ ...styles.cngBtn, backgroundColor: (onlyOpened ? '#000000' : '#ffffff'), borderWidth: 3 }}
              >
                <Text style={{ fontFamily: 'font1', color: (!onlyOpened ? '#000000' : '#ffffff') }}>{onlyOpened ? '전체 캡슐 보기' : '열린 캡슐만 보기'}</Text>
              </Pressable>
            </LinearGradient>
          </View>
          {item()}
        </ScrollView>
      </View>
      <NavBar style={{ flex: 1 }} navigation={navigation} currentScreen='List' />
    </View>
  );
}

export default CapsuleListScreen;
