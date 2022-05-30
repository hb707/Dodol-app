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
import NavBar from '../Components/NavBar/NavBar';
import { mRead } from '../Reducers/memory';
import defaultPic from '../../assets/background.jpeg';
import { IState, IMemory } from '../types';
import backgroundImg from '../../assets/paper.jpeg';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
  CreateMemory: undefined;
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
  const onPressIn = () => {
    setIsPress(true);
  };
  const onPressOut = () => {
    setIsPress(false);
  };

  useEffect(() => {
    dispatch(mRead({ c_idx: cIdx }));
  }, [dispatch, cIdx]);

  const item = () =>
    memory.data.map((v: IMemory) => (
      <Pressable
        style={{
          // height: 200,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key={v.m_idx}
        onPress={() => {
          navigation.navigate('MemoryView', { data: v });
        }}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <View
          style={{
            width: SCREEN_WIDTH * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.6)',
            marginVertical: 20,
            borderRadius: 20,
            position: 'relative',
            bottom: isPress ? 10 : 0,
          }}
        >
          <Text
            style={{
              paddingBottom: 10,
              fontSize: 15,
              fontWeight: 'bold',
              marginVertical: 20,
            }}
          >
            🌴{' '}
            {v.User.u_alias.length > 8
              ? `${v.User.u_alias.substring(0, 9)}...`
              : v.User.u_alias}
            님이 작성한 추억
          </Text>

          <Image
            source={
              v.MemoryImgs[0]
                ? {
                  uri: `http://43.200.42.181/upload/${v.MemoryImgs[0].img}`,
                }
                : defaultPic
            }
            style={{
              width: 0.65 * SCREEN_WIDTH,
              height: 0.65 * SCREEN_WIDTH,
              borderRadius: 10,
              // marginBottom: 20
            }}
          />
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.8)',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              paddingVertical: 20,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                width: 0.65 * SCREEN_WIDTH,
                // marginTop: 20,
                fontSize: 16,
                color: '#ffffff',
              }}
            >
              💬{'  '}
              {v.m_content.length > 30
                ? `${v.m_content.substring(0, 31)}...`
                : v.m_content}
            </Text>
          </View>
        </View>
      </Pressable>
    ));

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 12, justifyContent: 'center' }}>
        <ImageBackground
          source={backgroundImg}
          style={{ width: '100%', height: '100%' }}
        >
          <ScrollView contentContainerStyle={{ width: SCREEN_WIDTH }}>
            <View
              style={{
                height: 200,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                padding: 20,
                backgroundColor: '#ffffff',
                justifyContent: 'space-between',
              }}
            >
              <Text>캡슐인포</Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('CreateMemory');
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
