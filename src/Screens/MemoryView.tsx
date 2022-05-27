import { View, Text, ScrollView, Dimensions, Image } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import React from 'react';

import NavBar from '../Components/NavBar/NavBar';
import { IMemory } from '../types';

const SCREEN_WIDTH = Dimensions.get('window').width;

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
  CreateMemory: undefined;
  MemoryViewScreen: { data: IMemory };
};

type MemoryListScreenRouteProp = RouteProp<
  RootStackParamList,
  'MemoryViewScreen'
>;
type MemoryListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  route: MemoryListScreenRouteProp;
  navigation: MemoryListScreenNavigationProp;
};

function MemoryViewScreen({ navigation, route }: Props) {
  const { data } = route.params;
  const imgArr: string[] = [];
  data.MemoryImgs.map(v => imgArr.push(v.img));

  const item = () =>
    imgArr.map((v, i) => (
      <View style={{ width: SCREEN_WIDTH }} key={i}>
        <Image
          source={{ uri: `http://43.200.42.181/upload/${v}` }}
          style={{ width: SCREEN_WIDTH, height: 250 }}
        />
      </View>
    ));

  return (
    <>
      <View
        style={{ flex: 12, alignItems: 'center', justifyContent: 'center' }}
      >
        <View style={{ flex: 1 }}>
          <ScrollView horizontal pagingEnabled>
            {item()}
          </ScrollView>
          <Text>작성자 : {data.User.u_alias}</Text>
        </View>
        <View style={{ flex: 2, width: SCREEN_WIDTH }}>
          <Text>{data.m_content}</Text>
        </View>
      </View>
      <NavBar style={{ flex: 1 }} navigation={navigation} />
    </>
  );
}

export default MemoryViewScreen;
