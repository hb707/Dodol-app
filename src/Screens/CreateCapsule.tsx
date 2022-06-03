import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Button,
  Modal,
  Dimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ThumbPicker from './ThumbPicker';
import ModalLocation, { ILocation } from './CLocation';
import NavBar from '../Components/NavBar/NavBar';
import { create_R } from '../Reducers/capsule';
import {
  getUser,
  getThumb,
  getSpot,
  removeItemByKey,
} from '../Storages/storage';
import { IState, backUrl, Iuser } from '../types';
import CollaboratorScreen from './Collaborator';
import { IPayload } from '../api/capsule';

const SCREEN_WIDTH = Dimensions.get('window').width;

const checkDate = (y: string, m: string, d: string) =>
  moment(`${y}/${m}/${d}`, 'YYYY/MM/DD', true).isValid();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  page: {
    alignItems: 'center',
    flex: 12,
  },
  key: {
    fontFamily: 'font1',
    fontSize: 20,
    width: SCREEN_WIDTH * 0.9,
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    fontSize: 20,
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 15,
    marginBottom: 20,
    fontFamily: 'font1',
    width: SCREEN_WIDTH * 0.25,
    marginHorizontal: SCREEN_WIDTH * 0.01,
  },
  input: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    fontSize: 14,
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 15,
    marginBottom: 20,
  },
  submitBtn: {
    flex: 1,
    width: SCREEN_WIDTH * 0.9,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 20,
  },
  navBar: {
    flex: 1,
  },
});

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
  Collaborator: {
    onChangeCollaborator: (payload: number[]) => void;
  };
};

type Props = NativeStackScreenProps<RootStackParamList>;

const REST_API_KEY = '07e2741dea7ed6e8b2ba90e09024f231';

const userAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1';
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

interface errorsAttribute {
  title: string;
  description: string;
  location: string;
  date: string;
}

function CreateCapsuleScreen({ navigation, route }: Props) {
  const [cName, setcName] = useState<string>('');
  const [cDesc, setcDesc] = useState<string>('');
  const [cCollaborator, setcCollaborator] = useState([]);
  const [cYear, setYear] = useState('');
  const [cMonth, setMonth] = useState('');
  const [cDay, setDay] = useState('');
  const [cModalVisible, setCModalVisible] = useState(false);
  const [lModalVisible, setLModalVisible] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState<errorsAttribute>({
    title: '',
    description: '',
    location: '',
    date: '',
  });

  // console.log(new Date(`${cYear}-${cMonth}-${cDay}`))
  let capsule: IPayload;
  const dispatch = useDispatch();
  const capsuleState = useSelector((state: IState) => state.capsule);

  useEffect(() => {
    if (!submit) {
      (async function () {
        await removeItemByKey('spot');
        await removeItemByKey('thumbUrl');
      })();
    }
    if (capsuleState.success === true && submit === true) {
      navigation.navigate('Main');
    }
  }, [submit]);

  const SubmitHandler = async () => {
    const cGenerator: Iuser = await getUser();
    const cThumb: string | null = await getThumb();
    const cLocation: ILocation | null = await getSpot();

    let locationPass = false;
    let datePass = false;
    let titlePass = false;
    let descriptionPass = false;

    if (cLocation === null) {
      setErrors({
        ...errors,
        location: '캡슐을 묻을 위치를 지정해주세요',
      });
      setTimeout(() => {
        setErrors({
          ...errors,
          location: '',
        });
      }, 2000);
    } else {
      locationPass = true;
    }

    if (!checkDate(cYear, cMonth, cDay)) {
      setErrors({
        ...errors,
        date: '유효한 날짜를 입력해 주세요.',
      });
      setTimeout(() => {
        setErrors({
          ...errors,
          date: '',
        });
      });
    } else {
      datePass = true;
    }

    if (cName.replace(/' '/g, '') === '') {
      setErrors({
        ...errors,
        title: '캡슐 이름을 정해주세요',
      });
      setTimeout(() => {
        setErrors({
          ...errors,
          title: '',
        });
      });
    } else {
      titlePass = true;
    }

    if (cDesc.replace(/' '/g, '') === '') {
      setErrors({
        ...errors,
        description: '캡슐 이름을 정해주세요',
      });
      setTimeout(() => {
        setErrors({
          ...errors,
          description: '',
        });
      });
    } else {
      descriptionPass = true;
    }

    if (locationPass && datePass && titlePass && descriptionPass) {
      const cOpenAt = `${cYear}-${cMonth}-${cDay}`;
      capsule = {
        c_generator: cGenerator,
        c_title: cName,
        c_content: cDesc,
        c_location: cLocation,
        c_collaborator: cCollaborator,
        c_openAt: cOpenAt,
        c_thumb: cThumb,
      };
      setSubmit(true);
      dispatch(create_R(capsule));
    }
  };

  const onChangeCollaborator = (payload: number[]) => {
    setcCollaborator(payload);
  };
  console.log(errors);
  return (
    <View style={styles.container}>
      <View style={styles.page}>
        <KeyboardAwareScrollView
          style={{
            width: SCREEN_WIDTH,
          }}
        >
          <View
            style={{
              ...styles.inputBox,
              flexDirection: 'column',
              marginTop: 100,
            }}
          >
            <Text style={styles.key}> 캡슐명</Text>
            <TextInput
              style={{
                ...styles.input,
                fontFamily: 'font1',
                width: SCREEN_WIDTH * 0.9,
              }}
              onChangeText={setcName}
              value={cName}
              placeholder="캡슐명을 작성해주세요"
            />
            <Text>{errors.title}</Text>
          </View>

          <View
            style={{
              ...styles.inputBox,
              flexDirection: 'column',
              marginVertical: 10,
            }}
          >
            <Text style={styles.key}> 캡슐 설명</Text>
            <TextInput
              onChangeText={setcDesc}
              value={cDesc}
              style={{
                ...styles.input,
                width: SCREEN_WIDTH * 0.9,
                flex: 6,
                height: 300,
                fontFamily: 'font1',
              }}
              placeholder="타임캡슐을 표현할 수 있는 문구를 작성해주세요."
              textAlignVertical="top"
              textAlign="left"
              multiline
            />
          </View>

          <View
            style={{
              width: SCREEN_WIDTH * 0.9,
              marginLeft: SCREEN_WIDTH * 0.05,
              marginVertical: 10,
            }}
          >
            <Text style={styles.key}> 위치 및 친구추가</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <View>
                <Pressable
                  style={{
                    ...styles.submitBtn,
                    width: 150,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setLModalVisible(!lModalVisible);
                  }}
                >
                  <Feather name="map" size={24} color="black" />
                  <Text
                    style={{
                      marginLeft: 30,
                      fontFamily: 'font1',
                    }}
                  >
                    위치 검색
                  </Text>
                </Pressable>
              </View>

              <View>
                <Modal
                  animationType="slide"
                  transparent
                  visible={lModalVisible}
                >
                  <ModalLocation setModalVisible={setLModalVisible} />
                </Modal>

                <Modal
                  animationType="slide"
                  transparent
                  visible={cModalVisible}
                >
                  <CollaboratorScreen
                    onChangeCollaborator={onChangeCollaborator}
                    setModalVisible={setCModalVisible}
                    collaboList={cCollaborator}
                  />
                </Modal>
                <Pressable
                  style={{
                    ...styles.submitBtn,
                    width: 150,
                    borderColor: '#333333',
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setCModalVisible(true);
                  }}
                >
                  <Ionicons name="people-sharp" size={24} color="black" />
                  <Text
                    style={{
                      marginLeft: 30,
                      fontFamily: 'font1',
                    }}
                  >
                    {cCollaborator.length === 0
                      ? '친구추가'
                      : `${cCollaborator.length}명`}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View
            style={{
              ...styles.inputBox,
              flexDirection: 'column',
              marginVertical: 25,
            }}
          >
            <Text style={styles.key}> 썸네일 업로드</Text>
            <ThumbPicker />
            {errors.location === '' || <Text>{errors.location}</Text>}
          </View>

          <View
            style={{
              ...styles.inputBox,
              flexDirection: 'column',
              marginVertical: 20,
            }}
          >
            <Text style={styles.key}> 캡슐 오픈일</Text>
            <View
              style={{
                width: SCREEN_WIDTH * 0.9,
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <TextInput
                style={styles.date}
                onChangeText={setYear}
                value={cYear}
                placeholder="YYYY"
              />
              <TextInput
                style={styles.date}
                onChangeText={setMonth}
                value={cMonth}
                placeholder="MM"
              />
              <TextInput
                style={styles.date}
                onChangeText={setDay}
                value={cDay}
                placeholder="DD"
              />
            </View>
          </View>
          <View
            style={{
              width: SCREEN_WIDTH * 0.9,
              marginLeft: SCREEN_WIDTH * 0.05,
            }}
          >
            <Pressable
              style={{
                ...styles.submitBtn,
                backgroundColor: '#e4c86c',
              }}
              onPress={SubmitHandler}
            >
              <Text
                style={{
                  fontFamily: 'font1',
                  fontSize: 25,
                  letterSpacing: 10,
                }}
              >
                제출
              </Text>
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
      </View>

      <View style={styles.navBar}>
        <NavBar
          style={{ flex: 1 }}
          navigation={navigation}
          route={route}
          currentScreen="Add"
        />
      </View>
    </View>
  );
}

export default CreateCapsuleScreen;
