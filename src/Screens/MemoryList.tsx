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
  Modal
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
  const [modalVisible, setModalVisible] = useState(false)

  const dispatch = useDispatch();

  const memory = useSelector((state: IState) => state.memory);
  const capsuleList = useSelector((state: IState) => state.capsule.capsule)

  const cItem = capsuleList.filter((v) => v.c_idx === cIdx)[0]

  useEffect(() => {
    dispatch(mRead({ c_idx: cIdx }));
  }, [dispatch, cIdx]);

  const writers = cItem.c_collaborator.join(', ')

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
                  fontSize: 15,
                  fontWeight: 'bold',
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
                  shadowColor: "#000",
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
              <Text style={{ fontSize: 20 }}>{cItem.c_title}</Text>
              <Text>{cItem.c_openAt && JSON.stringify(cItem.c_openAt).substring(1, 11)}</Text>
              <Text style={{ paddingVertical: 10, width: SCREEN_WIDTH * 0.5 }}>{cItem.c_content}</Text>
              <Text><Ionicons name="md-people" size={20} color="black" />{'  '}{cItem.c_collaborator ? cItem.c_collaborator.length + 1 : 1}명</Text>
              <Text>나{cItem.c_collaborator.length !== 0 && `, ${writers}`}</Text>

            </View>
            <Pressable onPress={() => { setModalVisible(!modalVisible) }}>
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
              <Pressable onPress={() => { setModalVisible(false) }} style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)' }}>
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
    </View >
  );
}

export default MemoryListScreen;
