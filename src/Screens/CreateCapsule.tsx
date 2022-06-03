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
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ThumbPicker from './ThumbPicker';
import ModalLocation, { ILocation } from './CLocation';
import NavBar from '../Components/NavBar/NavBar';
import { create_R } from '../Reducers/capsule';
import { getUser, getThumb, getSpot } from '../Storages/storage';
import { IState, backUrl, Iuser } from '../types';
import CollaboratorScreen from './Collaborator';
import { IPayload } from '../api/capsule';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  page: {
    width: '100%',
    padding: 100,
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '70%',
    borderBottomWidth: 1,
    borderColor: 'black',
    fontSize: 20,
    margin: '5%',
  },

  submit: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
  },
  navBar: {
    flex: 0.1,
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
// const REDIRECT_URI = 'http://43.200.42.181/api/user/login';

const userAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1';
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

function CreateCapsuleScreen({ navigation, route }: Props) {
  const [cName, setcName] = useState<string>('');
  const [cDesc, setcDesc] = useState<string>('');
  const [cCollaborator, setcCollaborator] = useState([]);
  const [cYear, setYear] = useState();
  const [cMonth, setMonth] = useState();
  const [cDay, setDay] = useState();
  const [cModalVisible, setCModalVisible] = useState(false);
  const [lModalVisible, setLModalVisible] = useState(false);

  // console.log(new Date(`${cYear}-${cMonth}-${cDay}`))
  let capsule: IPayload;
  const dispatch = useDispatch();
  const capsuleState = useSelector((state: IState) => state.capsule);

  useEffect(() => {
    if (capsuleState.success === true) {
      navigation.navigate('Main');
    }
  });

  const SubmitHandler = async () => {
    const cGenerator: Iuser = await getUser();
    const cThumb: string | null = await getThumb();
    const cLocation: ILocation | null = await getSpot();

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
    dispatch(create_R(capsule));
  };

  const onChangeCollaborator = (payload: number[]) => {
    setcCollaborator(payload);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        style={styles.horizontalContainer}
        showsHorizontalScrollIndicator
        indicatorStyle="default"
      >
        <View style={styles.page}>
          <Pressable style={styles.inputBox}>
            <TextInput
              style={styles.input}
              onChangeText={setcName}
              value={cName}
              placeholder="캡슐명"
            />
            <MaterialCommunityIcons name="draw" size={24} color="black" />
          </Pressable>

          <Pressable style={styles.inputBox}>
            <TextInput
              style={styles.input}
              onChangeText={setcDesc}
              value={cDesc}
              placeholder="설명"
            />
            <MaterialCommunityIcons name="draw" size={24} color="black" />
          </Pressable>

          <ThumbPicker />

          <Button
            title="위치 검색"
            // style={styles.inputBox}
            onPress={() => {
              setLModalVisible(!lModalVisible);
            }}
          />
          <Modal
            animationType="slide"
            transparent
            visible={lModalVisible}
            // onRequestClose={console.log('닫힘')}
          >
            <ModalLocation setModalVisible={setLModalVisible} />
          </Modal>

          <Modal animationType="slide" transparent visible={cModalVisible}>
            <CollaboratorScreen
              onChangeCollaborator={onChangeCollaborator}
              setModalVisible={setCModalVisible}
              collaboList={cCollaborator}
            />
          </Modal>
          <Pressable
            style={{
              ...styles.inputBox,
              backgroundColor: 'rgba(0,0,0,0.3)',
              width: '70%',
              borderWidth: 2,
              borderColor: '#333333',
              paddingVertical: 7,
              borderRadius: 10,
              marginLeft: SCREEN_WIDTH * 0.15,
            }}
            onPress={() => {
              setCModalVisible(true);
            }}
          >
            <Ionicons name="people-sharp" size={24} color="black" />
            <Text style={{ marginLeft: 30 }}>
              {cCollaborator.length === 0
                ? '친구추가'
                : `${cCollaborator.length}명`}
            </Text>
          </Pressable>
          <Pressable style={styles.inputBox}>
            <TextInput
              style={styles.input}
              onChangeText={setYear}
              value={cYear}
              placeholder="YYYY"
            />
            <TextInput
              style={styles.input}
              onChangeText={setMonth}
              value={cMonth}
              placeholder="MM"
            />
            <TextInput
              style={styles.input}
              onChangeText={setDay}
              value={cDay}
              placeholder="DD"
            />
            <MaterialCommunityIcons name="draw" size={24} color="black" />
          </Pressable>

          <View>
            <Button
              title="제출"
              style={styles.submit}
              onPress={SubmitHandler}
            />
          </View>
        </View>
      </ScrollView>
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
