import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Modal,
  Dimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ThumbPicker from './ThumbPicker';
import ModalLocation, { ILocation } from './CLocation';
import NavBar from '../Components/NavBar/NavBar';
import { create_R } from '../Reducers/capsule';
import { getData, getSpot, removeItemByKey } from '../Storages/storage';
import { IState, IUser, Iuser } from '../types';
import CollaboratorScreen from './Collaborator';
import { IPayload } from '../api/capsule';
import setNoti from '../api/notification';

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
  errors: { color: 'tomato', fontFamily: 'font1', fontSize: 16 },
});

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
  Collaborator: {
    onChangeCollaborator: (payload: number[]) => void;
  };
  Main: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

interface errorsAttribute {
  title: string;
  description: string;
  location: string;
  date: string;
}

function CreateCapsuleScreen({ navigation, route }: Props) {
  const [cName, setcName] = useState<string>('');
  const [cDesc, setcDesc] = useState<string>('');
  const [cCollaborator, setcCollaborator] = useState<Iuser[]>([]);
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

  let capsule: IPayload;
  const dispatch = useDispatch();
  const capsuleState = useSelector((state: IState) => state.capsule);

  useEffect(() => {
    if (!submit) {
      (async function a() {
        await removeItemByKey('spot');
        await removeItemByKey('thumbUrl');
      })();
    }
    if (submit) {
      setNoti(Number(cYear), Number(cMonth), Number(cDay));
      setSubmit(false);
      navigation.navigate('Main');
    }
  }, [submit]);

  const SubmitHandler = async () => {
    const cGenerator: Iuser = await getData('user');
    const cThumb: string | null = await getData('thumbUrl');
    const cLocation: ILocation | null = await getSpot();

    let locationPass = false;
    let datePass = false;
    let titlePass = false;
    let descriptionPass = false;

    const errorCheck = { ...errors };

    if (cLocation === null) {
      errorCheck.location = '캡슐을 묻을 위치를 지정해주세요';
    } else {
      locationPass = true;
    }

    if (!checkDate(cYear, cMonth, cDay)) {
      errorCheck.date = '유효한 날짜를 입력해주세요.';
    } else {
      datePass = true;
    }

    if (cName.replace(/' '/g, '') === '') {
      errorCheck.title = '캡슐의 이름을 정해주세요.';
    } else {
      titlePass = true;
    }

    if (cDesc.replace(/' '/g, '') === '') {
      errorCheck.description = '캡슐에 대한 설명은 적어주세요.';
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
      // navigation.navigate('Main');
    } else {
      setErrors(errorCheck);
      setTimeout(() => {
        setErrors({
          title: '',
          description: '',
          location: '',
          date: '',
        });
      }, 3000);
    }
  };

  const onChangeCollaborator = (payload: Iuser[]) => {
    setcCollaborator(payload);
  };

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
            <View style={{ height: 30 }}>
              {errors.title === '' || (
                <Text style={styles.errors}>{errors.title}</Text>
              )}
            </View>
          </View>

          <View
            style={{
              ...styles.inputBox,
              flexDirection: 'column',
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
            <View style={{ height: 30 }}>
              {errors.description === '' || (
                <Text style={styles.errors}>{errors.description}</Text>
              )}
            </View>
          </View>

          <View
            style={{
              width: SCREEN_WIDTH * 0.9,
              marginLeft: SCREEN_WIDTH * 0.05,
              justifyContent: 'center',
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
            <View style={{ height: 30, width: '100%', alignItems: 'center' }}>
              {errors.location === '' || (
                <Text style={styles.errors}>{errors.location}</Text>
              )}
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
            <View style={{ height: 25 }}>
              {errors.date === '' || (
                <Text style={styles.errors}>{errors.date}</Text>
              )}
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
          currentScreen="Add"
        />
      </View>
    </View>
  );
}

export default CreateCapsuleScreen;
