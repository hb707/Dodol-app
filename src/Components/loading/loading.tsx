import React from 'react';
import { Image, View, Text, Dimensions } from 'react-native';
import Logo from '../../../assets/Home/logo.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const quoteList: string[] = [
  '추억은 영원한 마음의 보물\n',
  '좋은 시간은 좋은 추억으로,\n나쁜 시간은 좋은 교훈으로',
  '사람들은 변하지만,\n추억은 변하지 않아.',
  '아름다운 삶은 \n잊을 수 없는 순간의 모음이야.',
  '좋은 시절은 왔다가 가지만,\n추억은 영원할거야.',
  '우리는 무언가가 추억이 되기 전까지는\n절대 그것의 소중함을 알지 못한다.',
  '사진을 찍기보다는,\n마음으로 추억을 찍어라',
  '당신이 내 시야에서 없어졌을 수는 있겠지만,\n내 마음 속에서는 사라지지 않을 것입니다.',
];

function Loading() {
  const randomNum = Math.floor(Math.random() * 8);
  const makeQuote = () =>
    quoteList[randomNum].split('\n').map((v, i) => (
      <Text style={{ fontSize: 15, letterSpacing: -0.4 }} key={i}>
        {v}
      </Text>
    ));
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Image
        source={Logo}
        resizeMode="contain"
        style={{ width: 0.5 * SCREEN_WIDTH, height: 0.5 * SCREEN_WIDTH }}
      />
      <View
        style={{
          marginTop: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {makeQuote()}
      </View>
    </View>
  );
}

export default Loading;
