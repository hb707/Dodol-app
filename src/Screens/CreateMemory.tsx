import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Button,
  ScrollView,
  Image,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImgPicker from '../Components/imagePicker/ImagePicker';
import { create } from '../Reducers/memory';
import { IPayload } from '../Sagas/memorySaga';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
  MemoryList: { cIdx: 1 };
};

type Props = NativeStackScreenProps<RootStackParamList>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
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
    width: 0.9 * SCREEN_WIDTH,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    borderBottomColor: '#aeaeae',
    borderBottomWidth: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function CreateMemoryScreen({ navigation, route }: Props) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const onChangeContent = (payload: string) => setContent(payload);
  const onChangeImg = (payload: string) => setImage(payload);

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
    <KeyboardAwareScrollView contentContainerstyle={styles.contentContainer}>
      <View
        style={{ flex: 12, height: SCREEN_HEIGHT, justifyContent: 'center' }}
      >
        <View style={{ flex: 1, justifyContent: 'center' }} />
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ height: 250 }}
        >
          <View style={{ width: SCREEN_WIDTH }}>
            <Image source={{ uri: image }} style={styles.img} />
          </View>
          <View style={{ width: SCREEN_WIDTH }}>
            <Text>2</Text>
          </View>
          <View style={{ width: SCREEN_WIDTH }}>
            <Text>3</Text>
          </View>
        </ScrollView>
        <View style={{ flex: 2 }}>
          <ImgPicker onChangeImg={onChangeImg} />
        </View>
        <TextInput
          value={content}
          onChangeText={onChangeContent}
          style={{ ...styles.input, flex: 5 }}
          placeholder="타임캡슐에 남기고 싶은 내용을 작성해주세요."
          textAlignVertical="top"
          textAlign="left"
          multiline
        />
        <Button title="제출" onPress={handleSubmit} />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default CreateMemoryScreen;
