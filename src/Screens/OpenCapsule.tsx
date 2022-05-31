import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  Pressable,
  Vibration,
} from 'react-native';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NavBar from '../Components/NavBar/NavBar';
import { IMemory, Capsule, IState } from '../types';
import { getDataFromStorage } from '../Storages/storage';

import jarPic from '../../assets/Home/jar.png';
import capsuleThumbFrame from '../../assets/capsule_thumb_frame.png';
import defaultThumb from '../../assets/default_capsule_thumbnail.png';
import capsuleTitle from '../../assets/capsule_title_bg.png';
import capsuleOpenActions from '../actions/capsuleOpen';
import OpenLoading from '../Components/loading/openLoading';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
  CreateMemory: undefined;
  MemoryList: { cIdx: number };
  MemoryView: { data: IMemory };
  OpenCapsule: { cIdx: number };
};

type OpenCapsuleScreenRouteProp = RouteProp<RootStackParamList, 'OpenCapsule'>;
type OpenCapsuleScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  route: OpenCapsuleScreenRouteProp;
  navigation: OpenCapsuleScreenNavigationProp;
};

type OpenCapsuleType = 'yet' | 'success' | 'failure';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function getDistanceFromLatLonInKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d * 1000;
}

function OpenCapsule({ navigation, route }: Props) {
  const dispatch = useDispatch();

  const [thisCapsule, setThisCapusle] = useState<Capsule>({
    c_collaborator: [],
    c_content: null,
    c_generator: null,
    c_idx: null,
    c_location: null,
    c_openAt: null,
    c_thumb: null,
    c_title: null,
    isOpened: false,
    c_createdAt: null,
  });

  const [openCapsule, setOpenCapsule] = useState<OpenCapsuleType>('yet');
  const [pressCount, setPressCount] = useState(0);
  const [btnText, setBtnText] = useState('캡슐 오픈하기');
  const capsuleState = useSelector((state: IState) => state.capsule);

  const { cIdx } = route.params;

  const getCapsule = async () => {
    const tmp = (await getDataFromStorage('@capsule_item')).capsule;
    const result = tmp.filter((v: Capsule) => v.c_idx === cIdx);
    setThisCapusle(result[0]);
  };

  const checkDate = () => {
    const reserveDate = thisCapsule.c_openAt as Date;
    const dDay = new Date(reserveDate).getTime();
    const now = new Date(2025, 7, 1).getTime();
    if (dDay - now > 0) {
      return false;
    }

    return true;
  };

  const checkLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();

      const {
        coords: { latitude: lat1, longitude: lng1 },
      } = await Location.getCurrentPositionAsync();
      return getDistanceFromLatLonInKm(lat1, lng1, 37.539732, 127.12338);
    } catch (e) {
      console.log(e);
      return 200;
    }
  };

  const checkCapsule = async () => {
    const timePass = checkDate();
    if (!timePass) {
      setOpenCapsule('failure');
      setBtnText('아직 캡슐을 열어볼 수 없습니다.');
      return;
    }

    if ((await checkLocation()) > 100) {
      setOpenCapsule('failure');
      setBtnText('캡슐을 묻은 위치로 이동해주세요');
      return;
    }
    setBtnText('버튼을 눌러주세요!');
    setOpenCapsule('success');
  };

  const successBtnPress = async () => {
    if (pressCount < 10) {
      Vibration.vibrate();
      setPressCount(pressCount + 1);
      return;
    }
    dispatch(capsuleOpenActions.request({ c_idx: cIdx }));
    setTimeout(() => {
      navigation.navigate('MemoryList', { cIdx });
    }, 4000);
  };

  const pressBtn = () => {
    if (btnText === '캡슐정보 확인하는 중...') {
      return;
    }

    if (openCapsule === 'yet') {
      setBtnText('캡슐정보 확인하는 중...');
      checkCapsule();
    }

    if (openCapsule === 'success') {
      successBtnPress();
    }
  };

  useEffect(() => {
    if (openCapsule === 'yet') {
      getCapsule();
    }
  }, [openCapsule, cIdx]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flex: 12,
          width: 0.8 * SCREEN_WIDTH,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ImageBackground
          style={{
            width: '100%',
            height: '80%',
            alignItems: 'center',
            top: 0.09 * SCREEN_HEIGHT,
            position: 'relative',
          }}
          source={jarPic}
          resizeMode="contain"
        >
          <ImageBackground
            style={{
              width: 0.3 * SCREEN_WIDTH,
              height: 0.3 * SCREEN_WIDTH,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 0.25 * SCREEN_HEIGHT,
            }}
            source={capsuleThumbFrame}
            resizeMode="contain"
          >
            <Image
              style={{
                position: 'absolute',
                top: '10%',
                width: 0.24 * SCREEN_WIDTH,
                height: 0.24 * SCREEN_WIDTH,
              }}
              source={
                thisCapsule.c_thumb !== null
                  ? {
                      uri: `http://43.200.42.181/upload/${thisCapsule.c_thumb}`,
                    }
                  : defaultThumb
              }
            />
            <ImageBackground
              style={{
                width: 0.55 * SCREEN_WIDTH,
                height: 0.06 * SCREEN_HEIGHT,
                top: '72%',
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{ rotate: '4deg' }],
              }}
              source={capsuleTitle}
              resizeMode="contain"
            >
              <Text
                style={{ fontSize: 0.06 * SCREEN_WIDTH, fontWeight: '700' }}
              >
                {thisCapsule.c_title}
              </Text>
            </ImageBackground>
          </ImageBackground>
        </ImageBackground>
        <Pressable style={{ width: ' 100%' }} onPress={pressBtn}>
          <View
            style={{
              backgroundColor: '#e4c86c',
              width: '100%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>
              {btnText}
            </Text>
          </View>
        </Pressable>
      </View>
      {capsuleState.loading && <OpenLoading />}
      <NavBar style={{ flex: 1 }} navigation={navigation} />
    </View>
  );
}

export default OpenCapsule;
