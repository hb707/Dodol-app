import React, { useEffect } from 'react';
import { View, Dimensions, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NavBar from '../Components/NavBar/NavBar';
import Carousel from '../Components/carousel/Carousel';
import { backUrl } from '../types';

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

  // async storage
  useEffect(() => {
    // 왜 useEffect안에서 함수를 만들고 dependency에는 dispatch 함수를 넣어줘야하는지?????????🤯
    const loadCapsules = async () => {
      const item = await AsyncStorage.getItem(STORAGE_KEY);
      console.log(item);
      console.log('homescreen first render');
      // if (item) dispatch({ type: 'capsule/READ', item });
    };

    loadCapsules();
  }, [dispatch]);

  // axios 통신 확인용
  const onPress = async () => {
    try {
      const response = await axios.post(`${backUrl}/api/memory/create`, {
        c_idx: 1,
        m_content: 'gg',
        m_author: 1,
      });
      console.log('success : ', response.data);
    } catch (e) {
      console.log('fail : ', e);
    }
  };

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
      <Button title="axios" onPress={onPress} />
      <NavBar style={{ flex: 1 }} navigation={navigation} />
    </View>
  );
}

export default MainScreen;
