import React from 'react';
import styled from 'styled-components/native';
import {
  ViewStyle,
  ImageBackground,
  Text,
  Dimensions,
  Pressable,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { AntDesign } from '@expo/vector-icons';
import jarPic from '../../../assets/Home/jar.png';
import polaroidFrame from '../../../assets/capsule_thumb_frame.png';

interface ILastpage {
  navigation: any;
  style: ViewStyle | any;
}

export const PageItem = styled.Pressable`
  background-color: ${(props: { color: string }) => props.color};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function LastPage({ navigation, style }: ILastpage) {
  return (
    <Pressable
      style={{
        ...style,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
      }}
      onPress={() => {
        navigation.navigate('CreateCapsule');
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
              top: 0.37 * SCREEN_HEIGHT,
            }}
            source={polaroidFrame}
            resizeMode="contain"
          >
            <AntDesign name="pluscircle" size={50} color="#cecece" />
            <Text
              style={{
                marginTop: 14,
                color: '#cecece',
                fontFamily: 'font1',
              }}
            >
              캡슐 만들기
            </Text>
          </ImageBackground>
        </ImageBackground>
      </BlurView>
    </Pressable>
  );
}

export default LastPage;
