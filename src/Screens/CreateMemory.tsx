import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImgPicker from '../Components/imagePicker/ImagePicker';
import { create } from '../Reducers/memory';
import { IPayload } from '../Sagas/memorySaga';
import Preview from '../Components/imagePicker/Preview';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
  MemoryList: { cIdx: 1 };
};

type Props = NativeStackScreenProps<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: 0.9 * SCREEN_WIDTH,
  },
  cameraBtn: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#aeaeae',
  },
  input: {
    width: SCREEN_WIDTH,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtn: {
    flex: 1,
    backgroundColor: '#F5D042',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function CreateMemoryScreen({ navigation }: Props) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string[]>([]);

  const dispatch = useDispatch();

  const onChangeContent = (payload: string) => setContent(payload);
  const onChangeImg = (payload: string[]) => setImage(payload);

  // axios 통신 확인용
  const handleSubmit = async () => {
    const payload: IPayload = {
      c_idx: 1,
      m_content: content,
      m_author: 1,
      memoryImg: image,
    };
    dispatch(create(payload));
    navigation.navigate('MemoryList', { cIdx: 1 });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ flex: 1, justifyContent: 'center' }} />
        <Preview image={image} style={{ flex: 5 }} />
        <View style={{ flex: 3 }}>
          <ImgPicker onChangeImg={onChangeImg} />
        </View>
        <TextInput
          value={content}
          onChangeText={onChangeContent}
          style={{
            ...styles.input,
            flex: 6,
            justifyContent: 'center',
            alignItems: 'center',
            height: 300,
          }}
          placeholder="타임캡슐에 남기고 싶은 내용을 작성해주세요."
          textAlignVertical="top"
          textAlign="left"
          multiline
        />
        <Pressable onPress={handleSubmit} style={styles.submitBtn}>
          <Text>제출</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default CreateMemoryScreen;
