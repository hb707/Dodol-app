import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { NavigationEvents } from 'react-navigation';
import NavBar from '../Components/NavBar/NavBar';
import * as capsuleAction from '../Reducers/capsule';
import { read_R } from '../Reducers/capsule';
import { getThumb, storeCapsule } from '../Storages/storage';

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  containger: {
    flex: 1,
  },
  listBox: {
    flex: 12,
    width: screen.width,
    paddingTop: screen.width * 0.2,
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: screen.width * 0.01,
    height: screen.height * 0.15,
    borderRadius: 20,
    padding: screen.width * 0.03,
    backgroundColor: 'gold',
  },
  thumbBox: {
    flex: 1,
    height: screen.height * 0.125,
  },
  thumb: {
    flex: 1,
  },
  descBox: {
    flex: 1,
    padding: screen.width * 0.05,
    flexDirection: 'column',
  },
});

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

function CapsuleListScreen({ navigation, route }: Props) {
  const dispatch = useDispatch();
  const { capsule } = useSelector((state: IState) => state.capsule);

  function EachList() {
    const getMemory = v => {
      const cIdx = v.c_idx;
      navigation.navigate('MemoryList', cIdx);
    };

    return capsule.map((v, k) => (
      <Pressable
        key={k}
        style={styles.list}
        onPress={() => {
          getMemory(v);
        }}
      >
        <View style={styles.thumbBox}>
          <Image source={{ uri: v.c_thumb }} style={styles.thumb} />
        </View>
        <View style={styles.descBox}>
          <Text>{v.c_title}</Text>
          <Text>{v.c_content}</Text>
        </View>
      </Pressable>
    ));
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.listBox}>
        <ScrollView>
          <EachList />
        </ScrollView>
      </View>
      <NavBar style={{ flex: 1 }} navigation={navigation} />
    </View>
  );
}

export default CapsuleListScreen;
