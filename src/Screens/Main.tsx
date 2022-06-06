/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable global-require */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { View, Dimensions, Image, ImageBackground } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavBar from '../Components/NavBar/NavBar';
import Carousel from '../Components/carousel/Carousel';
import { Capsule, ICapsule, IState } from '../types';
import * as capsuleAction from '../Reducers/capsule';
import { getData, storeData } from '../Storages/storage';
import Loading from '../Components/loading/loading';

// Async Storage
const STORAGE_KEY = '@capsule_item';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const screenWidth = Math.round(Dimensions.get('window').width);

function MainScreen({ navigation }: Props) {
  const [saveGlobal, setSaveGlobal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch();
  const capsuleState = useSelector((state: IState) => state.capsule);
  const thumbs = () =>
    capsuleState.capsule.forEach(v => {
      if (v.c_thumb !== null && v.c_thumb !== '')
        Image.prefetch(`http://43.200.42.181/upload/${v.c_thumb}`);
    });

  const storeAndLoad = async () => {
    await storeData(STORAGE_KEY, capsuleState);
  };
  useEffect(() => {
    if (isLoading) {
      dispatch({ type: capsuleAction.READ_R });
    }
  });

  useEffect(() => {
    (async () => {
      if (capsuleState.loading === false) {
        thumbs();
        setIsLoading(false);
        await storeAndLoad();
      }
    })();
  }, [capsuleState.loading]);
  return isLoading ? (
    <Loading />
  ) : (
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
      <NavBar
        style={{ flex: 1 }}
        navigation={navigation}
        currentScreen="Main"
      />
    </View>
  );
}

export default MainScreen;
