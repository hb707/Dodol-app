import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';

interface Ipage {
  navigation: any;
  item: {
    num: number;
    color: string;
  };
  style: ViewStyle | any;
}

export const PageItem = styled.Pressable<{ color: string }>`
  background-color: ${(props: { color: string }) => props.color};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const PageNum = styled.Text``;

function Page({ navigation, item, style }: Ipage) {
  return (
    <PageItem
      color={item.color}
      style={style}
      onPress={() => {
        navigation.navigate('MemoryList', { cIdx: item.num });
      }}
    >
      <PageNum>{item.num}</PageNum>
    </PageItem>
  );
}

export default Page;
