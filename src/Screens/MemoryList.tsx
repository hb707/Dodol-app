import {
  View,
  Text,
  Button,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../Components/NavBar/NavBar';
import { mRead } from '../Reducers/memory';
import defaultPic from '../../assets/memoryThumb.png';
import { IState, IMemory } from '../types';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
  CreateMemory: undefined;
  MemoryList: { cIdx: number };
  MemoryView: { data: IMemory };
};

type MemoryListScreenRouteProp = RouteProp<RootStackParamList, 'MemoryList'>;
type MemoryListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  route: MemoryListScreenRouteProp;
  navigation: MemoryListScreenNavigationProp;
};

const SCREEN_WIDTH = Dimensions.get('window').width;
function MemoryListScreen({ navigation, route }: Props) {
  const { cIdx } = route.params;
  const dispatch = useDispatch();
  // const capsule = useSelector(state => state.capsule);
  const memory = useSelector((state: IState) => state.memory);

  useEffect(() => {
    dispatch(mRead({ c_idx: cIdx }));
  }, [dispatch, cIdx]);

  const item = () =>
    memory.data.map((v: IMemory) => (
      <Pressable
        style={{
          // height: 200,
          flexDirection: 'row',
          borderBottomColor: '#aeaeae',
          borderBottomWidth: 1,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key={v.m_idx}
        onPress={() => {
          navigation.navigate('MemoryView', { data: v });
        }}
      >
        <View>
          <Image
            source={
              v.MemoryImgs[0]
                ? {
                    uri: `http://43.200.42.181/upload/${v.MemoryImgs[0].img}`,
                  }
                : defaultPic
            }
            style={{
              width: 100,
              height: 100,
              marginLeft: -20,
              marginRight: 30,
              borderRadius: 10,
            }}
          />
        </View>
        <View style={{ height: 100, alignItems: 'flex-start' }}>
          <Text style={{ paddingBottom: 10, fontSize: 15, fontWeight: 'bold' }}>
            {v.User.u_alias.length > 8
              ? `${v.User.u_alias.substring(0, 9)}...`
              : v.User.u_alias}
            님이 작성한 추억
          </Text>
          <Text style={{ width: 200 }}>
            {v.m_content.length > 80
              ? `${v.m_content.substring(0, 81)}...`
              : v.m_content}
          </Text>
        </View>
      </Pressable>
    ));

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 12, justifyContent: 'center' }}>
        <ScrollView contentContainerStyle={{ width: SCREEN_WIDTH }}>
          <View
            style={{
              height: 200,
              flexDirection: 'row',
              borderBottomColor: '#aeaeae',
              borderBottomWidth: 1,
              padding: 20,
            }}
          >
            <Text>캡슐인포</Text>
            <Button
              title="추가하기"
              onPress={() => {
                navigation.navigate('CreateMemory');
              }}
            />
          </View>
          {memory.data.length !== 0 ? (
            item()
          ) : (
            <View>
              <Text>NO DATA</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <NavBar style={{ flex: 1 }} navigation={navigation} />
    </View>
  );
}

export default MemoryListScreen;
