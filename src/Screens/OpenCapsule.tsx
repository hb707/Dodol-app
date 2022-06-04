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
import { getDataFromStorage, setDataToStorage } from '../Storages/storage';

import capsuleThumbFrame from '../../assets/capsule_thumb_frame.png';
import defaultThumb from '../../assets/default_capsule_thumbnail.png';
import capsuleTitle from '../../assets/capsule_title_bg.png';
import openDateLabel from '../../assets/openDateLabel.png';
import openLocationLabel from '../../assets/openLocationLabel.png';
import capsuleOpenActions from '../actions/capsuleOpen';
import OpenLoading from '../Components/loading/openLoading';
import OpenCapsuleAlert from '../Components/alert/openCapsuleAlert';
import { mRead } from '../Reducers/memory';

import OpenCapsule0 from '../../assets/capsule/openCapsule0.png';
import OpenCapsule1 from '../../assets/capsule/openCapsule1.png';
import OpenCapsule2 from '../../assets/capsule/openCapsule2.png';
import OpenCapsule3 from '../../assets/capsule/openCapsule3.png';
import OpenCapsule4 from '../../assets/capsule/openCapsule4.png';
import OpenCapsule5 from '../../assets/capsule/openCapsule5.png';
import OpenCapsule6 from '../../assets/capsule/openCapsule6.png';
import OpenCapsule7 from '../../assets/capsule/openCapsule7.png';
import OpenCapsule8 from '../../assets/capsule/openCapsule8.png';
import OpenCapsule9 from '../../assets/capsule/openCapsule9.png';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
  CreateMemory: { cIdx: number };
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
  function deg2rad(deg: number) {
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
  const { cIdx } = route.params;
  const [errors, setErrors] = useState('');
  const [canWrite, setCanWrite] = useState(false);
  const [openCapsule, setOpenCapsule] = useState<OpenCapsuleType>('yet');
  const [pressCount, setPressCount] = useState(0);
  const [btnText, setBtnText] = useState('캡슐 오픈하기');
  const [alert, setAlert] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [jarImg, setJarImg] = useState(OpenCapsule0);
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

  const memoryState = useSelector((state: IState) => state.memory);
  const capsuleState = useSelector((state: IState) => state.capsule);
  const userState = useSelector((state: IState) => state.user);

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
      const c_location = thisCapsule.c_location as string;
      const [lat2, lng2] = c_location.split(',');
      return getDistanceFromLatLonInKm(lat1, lng1, Number(lat2), Number(lng2));
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

    const locationPass = await checkLocation();
    if (locationPass > 100 || Number.isNaN(locationPass)) {
      setOpenCapsule('failure');
      setBtnText('캡슐을 묻은 위치로 이동해주세요');
      return;
    }
    setBtnText('병을 계속 터치해서 열어주세요');
    setOpenCapsule('success');
  };

  const successJarPress = async () => {
    if (pressCount < 10) {
      Vibration.vibrate();
      setPressCount(pressCount + 1);
      return;
    }
    dispatch(capsuleOpenActions.request({ c_idx: cIdx }));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
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
  };

  const jarPress = () => {
    if (openCapsule === 'success') {
      successJarPress();
    }

    if (openCapsule === 'yet' || openCapsule === 'failure') {
      if (!canWrite) {
        setErrors('이미 작성을 완료한 캡슐 입니다.');
        setTimeout(() => {
          setErrors('');
        }, 2000);
      } else {
        navigation.navigate('CreateMemory', { cIdx });
      }
    }
  };

  const checkAlert = async () => {
    const data = await getDataFromStorage('@noAlertAgain');
    if (data) {
      setAlert(data.value);
    }
  };

  const checkMemoryWriter = () => {
    const memoryAuthorList = memoryState.data.map(v => v.m_author);
    if (memoryAuthorList.includes(userState.me.u_idx)) {
      setCanWrite(false);
    } else {
      setCanWrite(true);
    }
  };

  const getMemoryState = () => {
    dispatch(mRead({ c_idx: cIdx }));
  };

  useEffect(() => {
    if (openCapsule === 'yet') {
      getMemoryState();
      getCapsule();
      checkAlert();
    }
  }, [openCapsule, cIdx]);

  useEffect(() => {
    if (!memoryState.loading) {
      checkMemoryWriter();
    }
  }, [memoryState]);

  useEffect(() => {
    if (pressCount === 0) {
      return;
    }
    if (pressCount === 1) {
      setJarImg(OpenCapsule1);
    }
    if (pressCount === 2) {
      setJarImg(OpenCapsule2);
    }
    if (pressCount === 3) {
      setJarImg(OpenCapsule3);
    }
    if (pressCount === 4) {
      setJarImg(OpenCapsule4);
    }
    if (pressCount === 5) {
      setJarImg(OpenCapsule5);
    }
    if (pressCount === 6) {
      setJarImg(OpenCapsule6);
    }
    if (pressCount === 7) {
      setJarImg(OpenCapsule7);
    }
    if (pressCount === 8) {
      setJarImg(OpenCapsule8);
    }
    if (pressCount === 9) {
      setJarImg(OpenCapsule9);
    }
  }, [pressCount]);
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
        <Pressable
          style={{
            width: '100%',
            height: '80%',
            alignItems: 'center',
            top: 0,
            position: 'relative',
          }}
          onPress={jarPress}
        >
          <ImageBackground
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              position: 'relative',
            }}
            source={jarImg}
            resizeMode="contain"
          >
            <ImageBackground
              style={{
                width: 0.3 * SCREEN_WIDTH,
                height: 0.3 * SCREEN_WIDTH,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 0.3 * SCREEN_HEIGHT,
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
                  top: '110%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [{ rotate: '6deg' }],
                }}
                source={capsuleTitle}
                resizeMode="contain"
              >
                <Text
                  style={{ fontSize: 0.06 * SCREEN_WIDTH, fontFamily: 'font1' }}
                >
                  {thisCapsule.c_title}
                </Text>
              </ImageBackground>

              <ImageBackground
                style={{
                  width: 0.55 * SCREEN_WIDTH,
                  height: 0.06 * SCREEN_HEIGHT,
                  top: '115%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [{ rotate: '-4deg' }],
                }}
                source={openDateLabel}
                resizeMode="contain"
              >
                <Text
                  style={{ fontSize: 0.06 * SCREEN_WIDTH, fontFamily: 'font1' }}
                >
                  {thisCapsule.c_location?.split(',')[2]}
                </Text>
              </ImageBackground>
              <ImageBackground
                style={{
                  width: 0.6 * SCREEN_WIDTH,
                  height: 0.06 * SCREEN_HEIGHT,
                  top: '123%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [{ rotate: '6deg' }],
                }}
                source={openLocationLabel}
                resizeMode="contain"
              >
                <Text
                  style={{ fontSize: 0.05 * SCREEN_WIDTH, fontFamily: 'font1' }}
                >
                  {thisCapsule.c_openAt?.toString().split('T')[0]}
                </Text>
              </ImageBackground>
            </ImageBackground>
          </ImageBackground>
        </Pressable>
        <View
          style={{
            width: '100%',
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 16, color: 'red', fontFamily: 'font1' }}>
            {errors}
          </Text>
        </View>
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
            <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'font1' }}>
              {btnText}
            </Text>
          </View>
        </Pressable>
      </View>
      {(capsuleState.loading || isLoading) && <OpenLoading />}
      {alert || (
        <OpenCapsuleAlert
          setAlert={() => {
            setAlert(!alert);
          }}
        />
      )}
      <NavBar style={{ flex: 1 }} navigation={navigation} />
    </View>
  );
}

export default OpenCapsule;
