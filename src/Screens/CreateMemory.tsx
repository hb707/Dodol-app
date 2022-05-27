import React, { ReactElement, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';
import ImgPicker from '../Components/imagePicker/ImagePicker';
import { mCreate } from '../Reducers/memory';
import { IPayload } from '../Sagas/memorySaga';
import Preview from '../Components/imagePicker/Preview';
import youtubeAPI, { YoutubeResultAttribute } from '../api/youtubeAPI';

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
    width: SCREEN_WIDTH * 0.9,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#aeaeae',
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
  title: {
    fontSize: 20,
    paddingHorizontal: 20,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 15,
  },
});

function CreateMemoryScreen({ navigation }: Props) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResultArray, setSearchResultArray] = useState<
    YoutubeResultAttribute[]
  >([]);
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();

  const onChangeContent = (payload: string) => setContent(payload);
  const onChangeImg = (payload: string[]) => setImage(payload);
  const onChangeSearch = (payload: string) => setSearchValue(payload);
  const searchRequest = (payload: string) => async () => {
    const searchResult = await youtubeAPI(payload);
    setSearchResultArray(searchResult);
  };
  const minusIndex = () => {
    if (index === 0) return;
    setIndex(index - 1);
  };

  const plusIndex = () => {
    if (index === 4) return;
    setIndex(index + 1);
  };

  // axios 통신 확인용
  const handleSubmit = async () => {
    const payload: IPayload = {
      c_idx: 1,
      m_content: content,
      m_author: 1,
      memoryImg: image,
    };
    dispatch(mCreate(payload));
    navigation.navigate('MemoryList', { cIdx: 1 });
  };

  const searchResultRender = (currentIndex: number): ReactElement => {
    const { thumbnail } = searchResultArray[currentIndex];
    let { title } = searchResultArray[currentIndex];
    if (title.length > 16) {
      title = `${title.substring(0, 17)}...`;
    }
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Pressable style={{ justifyContent: 'center' }} onPress={minusIndex}>
          <MaterialIcons name="navigate-before" size={60} color="black" />
        </Pressable>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{
              width: 0.7 * SCREEN_WIDTH,
              height: 0.7 * SCREEN_WIDTH,
              marginBottom: 20,
            }}
            source={{
              uri: thumbnail,
            }}
          />
          <Text style={{ fontSize: 20, fontWeight: '600' }}>{title}</Text>
        </View>
        <Pressable style={{ justifyContent: 'center' }} onPress={plusIndex}>
          <MaterialIcons name="navigate-next" size={60} color="black" />
        </Pressable>
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ flex: 1, justifyContent: 'center' }} />
        <Preview image={image} style={{ flex: 5 }} />
        <View style={{ flex: 3 }}>
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
            }}
            placeholder="타임캡슐에 남기고 싶은 내용을 작성해주세요."
            textAlignVertical="top"
            textAlign="left"
            multiline
          />
        </View>
        <Text style={styles.title}>음악검색</Text>
        <View style={{ flex: 6, alignItems: 'center', marginBottom: 30 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 0.9 * SCREEN_WIDTH,
              marginBottom: 20,
            }}
          >
            <TextInput
              placeholder="123"
              style={{
                ...styles.input,
                width: 0.6 * SCREEN_WIDTH,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onChangeText={onChangeSearch}
            />
            <Pressable onPress={searchRequest(searchValue)}>
              <View
                style={{
                  ...styles.submitBtn,
                  width: SCREEN_WIDTH * 0.2,
                  borderRadius: 10,
                }}
              >
                <Text>검색</Text>
              </View>
            </Pressable>
          </View>
          {searchResultArray.length !== 0 && searchResultRender(index)}
        </View>

        <Pressable onPress={handleSubmit} style={styles.submitBtn}>
          <Text>제출</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default CreateMemoryScreen;
