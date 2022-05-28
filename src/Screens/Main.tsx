import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavBar from '../Components/NavBar/NavBar';
import Carousel from '../Components/carousel/Carousel';
import { IState } from '../types';

// Async Storage
const STORAGE_KEY = '@capsule_item';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const screenWidth = Math.round(Dimensions.get('window').width);
const PAGES = [
  {
    num: 1,
    color: '#cecece',
  },
  {
    num: 2,
    color: '#D0E6A5',
  },
  {
    num: 3,
    color: '#FFDD94',
  },
  {
    num: 4,
    color: '#FA897B',
  },
  {
    num: 5,
    color: '#CCABD8',
  },
];

function MainScreen({ navigation }: Props) {
  const {
    me: { u_idx },
  } = useSelector((state: IState) => state.user);

  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState();

  useEffect(() => {
    console.log('test');
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 12, justifyContent: 'center' }}>
        <Carousel
          navigation={navigation}
          gap={16}
          offset={36}
          pages={PAGES}
          pageWidth={screenWidth - (16 + 36) * 2}
        />
      </View>
      <NavBar style={{ flex: 1 }} navigation={navigation} />
    </View>
  );
}

export default MainScreen;
