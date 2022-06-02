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
import { getThumb, storeCapsule } from '../Storages/storage';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch();
  const capsuleState = useSelector((state: IState) => state.capsule);
  const thumbs = () =>
    capsuleState.capsule.map(v => {
      if (v.c_thumb !== null && v.c_thumb !== '')
        return Image.prefetch(`http://43.200.42.181/upload/${v.c_thumb}`);
    });

  const storeAndLoad = async () => {
    await storeCapsule(capsuleState);
    await Promise.all([...thumbs()]);
  };
  useEffect(() => {
    if (!saveGlobal) {
      dispatch({ type: capsuleAction.READ_R });
      setSaveGlobal(true);
    } else {
      storeAndLoad();
    }
  }, [saveGlobal]);
  storeAndLoad();
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
