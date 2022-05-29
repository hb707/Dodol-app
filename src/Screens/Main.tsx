/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Dimensions, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Asset } from 'expo-asset';
import NavBar from '../Components/NavBar/NavBar';
import Carousel from '../Components/carousel/Carousel';
import { IState } from '../types';
import * as capsuleAction from '../Reducers/capsule';
import { storeCapsule, getDataFromStorage } from '../Storages/storage';

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
  const dispatch = useDispatch();
  const capsuleState = useSelector((state: IState) => state.capsule);
  const [isLoading, setisLoading] = useState(true);

  const thumbs = () =>
    capsuleState.capsule.map(v => {
      if (v.c_thumb !== null && v.c_thumb !== '')
        return Image.prefetch(`http://43.200.42.181/upload/${v.c_thumb}`);
    });

  const getImg = async () => {
    await Promise.all(thumbs());
  };

  useEffect(() => {
    (async function tmp() {
      dispatch({ type: capsuleAction.READ_R });
      await storeCapsule(capsuleState);
      await getImg();
      setisLoading(false);
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 12, justifyContent: 'center' }}>
        <Carousel
          navigation={navigation}
          gap={16}
          offset={36}
          pages={capsuleState.capsule}
          pageWidth={screenWidth - (16 + 36) * 2}
        />
      </View>
      <NavBar style={{ flex: 1 }} navigation={navigation} />
    </View>
  );
}

export default MainScreen;
