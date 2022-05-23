import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';

interface ILastpage {
  navigation: any;
  style: ViewStyle | any;
}

export const PageItem = styled.Pressable<{ color: string }>`
  background-color: ${(props: { color: string }) => props.color};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const PageNum = styled.Text`
  color: white;
`;

function LastPage({ navigation, style }: ILastpage) {
  return (
    <PageItem
      color="black"
      style={style}
      onPress={() => {
        navigation.navigate('CreateCapsule');
      }}
    >
      <PageNum>추가하기</PageNum>
    </PageItem>
  );
}

export default LastPage;
