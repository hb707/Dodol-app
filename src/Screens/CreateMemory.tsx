import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  ImageBackground,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ImgPicker from '../Components/imagePicker/ImagePicker';
import { mCreate } from '../Reducers/memory';
import { IPayload } from '../Sagas/memorySaga';
import Preview from '../Components/imagePicker/Preview';

import SearchMusic from '../Components/searchMusic/SearchMusic';
import backgroundImg from '../../assets/paper.jpeg';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
  CreateMemory: { cIdx: number };
  MemoryList: { cIdx: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'CreateMemory'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
  },
  cameraBtn: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#000000',
  },
  input: {
    width: SCREEN_WIDTH * 0.9,
    paddingVertical: 20,
    paddingHorizontal: 20,
    fontSize: 14,
    borderWidth: 3,
    borderColor: '#000000',
    // backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 15,
    marginBottom: 20,
  },
  contentContainer: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtn: {
    flex: 1,
    backgroundColor: 'orange',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 16,
    fontFamily: 'font1',
    marginTop: 20,
    marginBottom: 15,
    marginLeft: 30,
  },
});

function CreateMemoryScreen({ navigation, route }: Props) {
  const { cIdx } = route.params;
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string[]>([]);
  const [music, setMusic] = useState('');
  const [uIdx, setUIdx] = useState<number>(-1);

  const dispatch = useDispatch();

  const onChangeContent = (payload: string) => setContent(payload);
  const onChangeImg = (payload: string[]) => setImage(payload);
  const onChangeMusic = (payload: string) => setMusic(payload);

  const handleSubmit = async () => {
    const payload: IPayload = {
      c_idx: cIdx,
      m_content: content,
      m_author: uIdx,
      memoryImg: image,
      music,
    };

    dispatch(mCreate(payload));
    navigation.navigate('MemoryList', { cIdx });
  };

  const getUser = async () => {
    const userItem = await AsyncStorage.getItem('user');
    if (userItem) {
      const { u_idx }: { u_idx: number } = JSON.parse(userItem);
      setUIdx(u_idx);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
      <View style={{ flex: 1, justifyContent: 'center', width: SCREEN_WIDTH }}>
        <View style={{ flex: 1, justifyContent: 'center' }} />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            marginVertical: 12,
            fontFamily: 'font1',
          }}
        />
        {image.length !== 0 && <Preview image={image} style={{ flex: 5 }} />}

        <View style={{ flex: 3, marginHorizontal: 30 }}>
          <ImgPicker onChangeImg={onChangeImg} />
        </View>

        <Text style={styles.title}>내용</Text>
        <View
          style={{ flexDirection: 'column', flex: 6, alignItems: 'center' }}
        >
          <TextInput
            value={content}
            onChangeText={onChangeContent}
            style={{
              ...styles.input,
              flex: 6,
              justifyContent: 'center',
              alignItems: 'center',
              height: 300,
              borderRadius: 15,
              fontFamily: 'font1',
            }}
            placeholder="타임캡슐에 남기고 싶은 내용을 작성해주세요."
            textAlignVertical="top"
            textAlign="left"
            multiline
          />
        </View>
        <Text style={styles.title}>음악검색</Text>
        <SearchMusic onChangeMusic={onChangeMusic} />

        <Pressable onPress={handleSubmit} style={styles.submitBtn}>
          <Text
            style={{
              fontFamily: 'font1',
              color: '#ffffff',
              fontSize: 18,
              letterSpacing: 10,
            }}
          >
            제출
          </Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
  // return (
  //   <View>
  //     <Text>왜????</Text>
  //   </View>
  // );
}

export default CreateMemoryScreen;
