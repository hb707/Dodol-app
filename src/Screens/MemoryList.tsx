/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
  ImageBackground,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../Components/NavBar/NavBar';
import { mRead } from '../Reducers/memory';
import defaultPic from '../../assets/background.jpeg';
import { IState, IMemory } from '../types';
import backgroundImg from '../../assets/paper.jpeg';
import polaroid from '../../assets/polaroid.png';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
  CreateMemory: { cIdx: number };
  MemoryList: { cIdx: number };
  MemoryView: { data: IMemory };
};

type MemoryListScreenRouteProp = RouteProp<RootStackParamList, 'MemoryList'>;
type MemoryListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  route: MemoryListScreenRouteProp;
  navigation: MemoryListScreenNavigationProp;
};

const SCREEN_WIDTH = Dimensions.get('window').width;
function MemoryListScreen({ navigation, route }: Props) {
  const { cIdx } = route.params;
  const [isPress, setIsPress] = useState<boolean>(false);
  const dispatch = useDispatch();
  // const capsule = useSelector(state => state.capsule);
  const memory = useSelector((state: IState) => state.memory);

  const getCapsuleItem = async () => {
    const capsuleList = await AsyncStorage.getItem('@capsule_item');
    if (capsuleList) {
      const { capsule } = JSON.parse(capsuleList);
      console.log(capsule)
    }
  };

  useEffect(() => {
    dispatch(mRead({ c_idx: cIdx }));
    getCapsuleItem()
  }, [dispatch, cIdx]);

  const item = () =>
    memory.data.map((v: IMemory) => (
      <Pressable
        style={{
          // height: 200,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 50,
          width: 350,
          height: 420
        }}
        key={v.m_idx}
        onPress={() => {
          navigation.navigate('MemoryView', { data: v });
        }}
      >
        <ImageBackground
          source={polaroid}
          style={{ width: '100%', height: '100%' }}
        >
          <View
            style={{
              width: SCREEN_WIDTH * 0.9,
              marginLeft: 28,
              marginTop: 27,
              borderRadius: 20,
              position: 'relative',
              bottom: isPress ? 10 : 0,
            }}
          >


            <Image
              source={
                v.MemoryImgs[0]
                  ? {
                    uri: `http://43.200.42.181/upload/${v.MemoryImgs[0].img}`,
                  }
                  : defaultPic
              }
              style={{
                width: 300,
                height: 310,
              }}
            />
            <View
              style={{
                width: '100%',
                marginTop: 10,
                marginLeft: 10
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginBottom: 10
                }}
              >
                {v.User.u_alias.length > 8
                  ? `${v.User.u_alias.substring(0, 9)}...`
                  : v.User.u_alias}
              </Text>
              <Text
                style={{
                  width: 0.65 * SCREEN_WIDTH,
                  fontSize: 16,
                  color: '#333',
                }}
              >
                💬{'  '}
                {v.m_content.length > 30
                  ? `${v.m_content.substring(0, 31)}...`
                  : v.m_content}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    ));

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 12, justifyContent: 'center' }}>
        <ImageBackground
          source={backgroundImg}
          style={{ width: '100%', height: '100%' }}
        >
          <ScrollView contentContainerStyle={{ width: SCREEN_WIDTH, alignItems: 'center' }}>
            <View
              style={{
                height: 200,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                padding: 20,
                backgroundColor: '#ffffff',
                justifyContent: 'space-between',
                marginBottom: 30
              }}
            >
              <Text>캡슐인포{cIdx}</Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('CreateMemory', { cIdx });
                }}
                style={{ flexDirection: 'row' }}
              >

                <View
                  style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: 25,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <AntDesign name="pluscircle" size={16} color="#ffffff" />
                  <Text style={{
                    fontSize: 16,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: '#ffffff',
                    marginLeft: 10
                  }}>캡슐 속에 담을 글쓰기</Text>
                </View>
              </Pressable>
            </View>
            {memory.data.length !== 0 ? (
              item()
            ) : (
              <View>
                <Text>NO DATA</Text>
              </View>
            )}
          </ScrollView>
        </ImageBackground>
      </View>
      <NavBar style={{ flex: 1 }} navigation={navigation} />
    </View>
  );
}

export default MemoryListScreen;
