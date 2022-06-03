/* eslint-disable global-require */
import React from 'react';
import styled from 'styled-components/native';
import {
  ViewStyle,
  Image,
  View,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Capsule } from '../../types';

import jarPic from '../../../assets/Home/jar.png';

interface Ipage {
  navigation: any;
  item: Capsule;
  style: ViewStyle | any;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const PageItem = styled.Pressable`
  justify-content: center;
  align-items: center;
`;

const PageNum = styled.Text``;

function Page({ navigation, item, style }: Ipage) {
  const openDate = item.c_openAt as Date;
  const openAt = new Date(openDate).getTime();
  const now = new Date(new Date().getTime() + 1000 * 60 * 60 * 9);
  const nowDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const dDay = (openAt - nowDate) / (1000 * 60 * 60 * 24);
  return (
    <PageItem
      style={{
        ...style,
        // borderRadius: '30px',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => {
        if (item.isOpened) {
          navigation.navigate('MemoryList', { cIdx: item.c_idx });
        } else {
          navigation.navigate('OpenCapsule', { cIdx: item.c_idx });
        }
      }}
    >
      <BlurView
        intensity={30}
        tint="light"
        style={{
          width: 0.72 * SCREEN_WIDTH,
          height: 0.8 * SCREEN_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ImageBackground
          style={{
            width: '95%',
            height: '100%',
            alignItems: 'center',
            position: 'relative',
          }}
          source={jarPic}
          resizeMode="contain"
        >
          <ImageBackground
            style={{
              width: 0.45 * SCREEN_WIDTH,
              height: 0.45 * SCREEN_WIDTH,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 0.25 * SCREEN_HEIGHT,
            }}
            source={require('../../../assets/capsule_thumb_frame.png')}
            resizeMode="contain"
          >
            <Image
              style={{
                position: 'absolute',
                top: '10%',
                width: 0.36 * SCREEN_WIDTH,
                height: 0.36 * SCREEN_WIDTH,
              }}
              source={
                item.c_thumb !== null
                  ? { uri: `http://43.200.42.181/upload/${item.c_thumb}` }
                  : require('../../../assets/default_capsule_thumbnail.png')
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
              source={require('../../../assets/capsule_title_bg.png')}
              resizeMode="contain"
            >
              <Text
                style={{
                  fontSize: 0.06 * SCREEN_WIDTH,
                  // fontWeight: '700',
                  fontFamily: 'font1',
                }}
              >
                {item.c_title}
              </Text>
            </ImageBackground>
            <ImageBackground
              style={{
                width: 0.45 * SCREEN_WIDTH,
                height: 0.06 * SCREEN_HEIGHT,
                top: '73%',
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{ rotate: '-5deg' }],
              }}
              source={require('../../../assets/capsule_date_bg.png')}
              resizeMode="contain"
            >
              <Text style={{ fontFamily: 'font1' }}>
                {dDay < 0 ? '캡슐을 눌러보세요' : `D-${dDay || 'Day'}`}
              </Text>
            </ImageBackground>
          </ImageBackground>
        </ImageBackground>
      </BlurView>
    </PageItem>
  );
}

export default Page;
