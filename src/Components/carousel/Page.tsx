import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle, Image, View, Text, Dimensions } from 'react-native';
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
  return (
    <PageItem
      style={{
        ...style,
        borderRadius: '30px',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => {
        navigation.navigate('MemoryList', { cIdx: item.c_idx });
      }}
    >
      <BlurView
        intensity={60}
        tint="light"
        style={{
          width: 0.72 * SCREEN_WIDTH,
          height: 0.8 * SCREEN_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image style={{ width: '90%' }} source={jarPic} resizeMode="contain" />
        {/* <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: `http://43.200.42.181/upload/${item.c_thumb}` }}
        /> */}
        <View>{/* <Text>{item.c_title}</Text> */}</View>
      </BlurView>
    </PageItem>
  );
}

export default Page;
