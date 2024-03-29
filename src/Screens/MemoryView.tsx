import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';
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

const styles = StyleSheet.create({
  container: {
    flex: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 30,
  },
  musicPlayBtn: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  musicViewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginLeft: 20,
  },
  picIdx: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 7,
    paddingHorizontal: 14,
    margin: 10,
    color: '#ffffff',
    borderRadius: 20,
  },
});

function MemoryViewScreen({ navigation, route }: Props) {
  const [playing, setPlaying] = useState(true);
  const [playerView, setPlayerView] = useState(false);

  const { data } = route.params;
  const imgArr: string[] = [];
  data.MemoryImgs.map(v => imgArr.push(v.img));

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const toggleView = useCallback(() => {
    setPlayerView(prev => !prev);
  }, []);

  const item = () =>
    imgArr.map((v, i) => (
      <View
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_WIDTH,
          position: 'relative',
        }}
        key={i}
      >
        <Image
          source={{ uri: `http://43.200.42.181/upload/${v}` }}
          style={{ width: '100%', height: '100%' }}
        />
        <Text style={styles.picIdx}>
          {i + 1}/{imgArr.length}
        </Text>
      </View>
    ));

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ height: '100%' }}>
          <View style={{ flex: 3, width: SCREEN_WIDTH }}>
            <View style={styles.titleView}>
              <View>
                <Text style={{ fontSize: 20, fontFamily: 'font1' }}>
                  {data.User.u_alias}
                </Text>
                {/* <Text style={{ fontSize: 14, color: 'gray' }}>
                  @ 2022. 05.28
                </Text> */}
              </View>
              <View style={{ flexDirection: 'row' }}>
                {data.MemoryMusic && data.MemoryMusic.link ? (
                  <>
                    <Pressable onPress={togglePlaying}>
                      <View style={styles.musicPlayBtn}>
                        <Ionicons
                          name={playing ? 'md-pause' : 'play'}
                          size={18}
                          color="black"
                        />
                      </View>
                    </Pressable>
                    <Pressable onPress={toggleView}>
                      <View style={styles.musicViewBtn}>
                        <Text>영상</Text>
                        <Ionicons
                          name={playerView ? 'caret-up' : 'caret-down'}
                          size={12}
                          color="black"
                        />
                      </View>
                    </Pressable>
                  </>
                ) : (
                  <View style={{ width: 30 }} />
                )}
              </View>
            </View>
            {data.MemoryMusic.link ? (
              <View style={{ opacity: 1 }}>
                <YoutubePlayer
                  height={playerView ? 300 : 0}
                  play={playing}
                  videoId={data.MemoryMusic.link}
                  onChangeState={onStateChange}
                />
              </View>
            ) : (
              <View />
            )}
            <ScrollView horizontal pagingEnabled>
              {item()}
            </ScrollView>
          </View>
          <ScrollView
            style={{
              flex: 1,
              width: SCREEN_WIDTH,
              padding: 20,
            }}
          >
            <Text style={{ fontFamily: 'font2', fontSize: 30 }}>
              {data.m_content}
            </Text>
          </ScrollView>
        </ScrollView>
      </View>
      <NavBar
        style={{ flex: 1 }}
        navigation={navigation}
        currentScreen="MemoryView"
      />
    </>
  );
}

export default MemoryViewScreen;
