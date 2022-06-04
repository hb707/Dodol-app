/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
  ImageBackground,
  Platform,
  Modal,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../Components/NavBar/NavBar';
import { mRead } from '../Reducers/memory';
import defaultPic from '../../assets/background.jpeg';
import defaultCapsuleThumbPic from '../../assets/default_capsule_thumbnail.png';
import { IState, IMemory } from '../types';
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
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const memory = useSelector((state: IState) => state.memory);
  const capsuleList = useSelector((state: IState) => state.capsule.capsule);

  const cItem = capsuleList.filter(v => v.c_idx === cIdx)[0];

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
          marginBottom: 50,
          width: 350,
          height: 420,
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
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'font1',
                  marginBottom: 10,
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
                  fontFamily: 'font1',
                  color: '#333',
                }}
              >
                💬{'  '}
                {v.m_content.split('\n')[0].length > 13
                  ? `${v.m_content.split('\n')[0].substring(0, 14)}...`
                  : v.m_content.split('\n')[0]}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    ));

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 12, justifyContent: 'center' }}>
        <ScrollView
          contentContainerStyle={{
            width: SCREEN_WIDTH,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              // height: 200,
              flexDirection: 'row',
              alignItems: 'center',
              width: SCREEN_WIDTH,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              padding: 30,
              paddingTop: 50,
              backgroundColor: 'rgb(229,229,229)',
              justifyContent: 'space-between',
              marginBottom: 30,
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 10,
                    height: 10,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 10,
                },
                android: {
                  elevation: 10,
                },
              }),
            }}
          >
            <View>
              <Text style={{ fontSize: 20, fontFamily: 'font1' }}>{cItem.c_title}</Text>
              <Text style={{ fontSize: 12, fontFamily: 'font1', color: 'gray' }} >{cItem.c_openAt && JSON.stringify(cItem.c_openAt).substring(1, 11)}</Text>
              <Text style={{ paddingVertical: 10, width: SCREEN_WIDTH * 0.5, fontSize: 16, fontFamily: 'font1' }}>{cItem.c_content}</Text>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Ionicons name="md-people" size={20} color="#444" />
                <Text
                  style={{ fontFamily: 'font1', fontSize: 12, color: '#444' }}
                >
                  {'  '}
                  {cItem.c_collaborator ? cItem.c_collaborator.length + 1 : 1}명
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Image
                source={
                  cItem.c_thumb
                    ? {
                        uri: `http://43.200.42.181/upload/${cItem.c_thumb}`,
                      }
                    : defaultCapsuleThumbPic
                }
                style={{
                  width: SCREEN_WIDTH * 0.3,
                  height: SCREEN_WIDTH * 0.3,
                  borderWidth: 5,
                  borderColor: '#ffffff',
                }}
              />
            </Pressable>
            <Modal animationType="fade" transparent visible={modalVisible}>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                }}
              >
                <Image
                  source={
                    cItem.c_thumb
                      ? {
                          uri: `http://43.200.42.181/upload/${cItem.c_thumb}`,
                        }
                      : defaultCapsuleThumbPic
                  }
                  style={{
                    width: SCREEN_WIDTH,
                    height: SCREEN_WIDTH,
                  }}
                />
              </Pressable>
            </Modal>
          </View>

          {memory.data.length !== 0 ? (
            item()
          ) : (
            <View>
              <Text> </Text>
            </View>
          )}
        </ScrollView>
      </View>
      <NavBar style={{ flex: 1 }} navigation={navigation} />
    </View>
  );
}

export default MemoryListScreen;
