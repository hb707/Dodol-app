import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle, Image, View, Text } from 'react-native';
import { Capsule } from '../../types';
import defaultPic from '../../../assets/Home/flowers.jpg';

import jarPic from '../../../assets/Home/jar.png';

interface Ipage {
  navigation: any;
  item: Capsule;
  style: ViewStyle | any;
}

export const PageItem = styled.Pressable`
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const PageNum = styled.Text``;

function Page({ navigation, item, style }: Ipage) {
  return (
    <PageItem
      style={style}
      onPress={() => {
        navigation.navigate('MemoryList', { cIdx: item.c_idx });
      }}
    >
      <Image style={{ width: 250, height: 400 }} source={jarPic} />
      <Image
        style={{ width: 100, height: 100 }}
        source={{ uri: `http://43.200.42.181/upload/${item.c_thumb}` }}
      />
      <View>
        <Text>{item.c_title}</Text>
      </View>
    </PageItem>
  );
}

export default Page;
