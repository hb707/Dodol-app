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
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ThumbPicker from './ThumbPicker';
import ModalLocation from './CLocation';
import NavBar from '../Components/NavBar/NavBar';
import { create_R } from '../Reducers/capsule';
import { getUser, getThumb } from '../Storages/storage';
import { IState, backUrl } from '../types';

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
};

type Props = NativeStackScreenProps<RootStackParamList>;

const REST_API_KEY = '07e2741dea7ed6e8b2ba90e09024f231';
// const REDIRECT_URI = 'http://43.200.42.181/api/user/login';

const userAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1';
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

function CreateCapsuleScreen({ navigation, route }: Props) {
  const [cName, setcName] = useState();
  const [cDesc, setcDesc] = useState();
  const [cCollaborator, setcCollaborator] = useState();
  const [cOpenAt, setOpenAt] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  let capsule;
  const dispatch = useDispatch();

  const SubmitHandler = async () => {
    const cGenerator: object = await getUser();
    const cThumb = await getThumb();
    capsule = {
      cGenerator,
      cName,
      cDesc,
      // cLocation,
      cCollaborator,
      cOpenAt,
      cThumb,
    };
    dispatch(create_R(capsule));
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
              setModalVisible(!modalVisible);
            }}
          />

          <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            // onRequestClose={console.log('닫힘')}
          >
            <ModalLocation setModalVisible={setModalVisible} />
          </Modal>

          {/* <MaterialCommunityIcons name="draw" size={24} color="black" /> */}

          <Pressable style={styles.inputBox}>
            <TextInput
              style={styles.input}
              onChangeText={setcCollaborator}
              value={cCollaborator}
              placeholder="파트너"
            />
            <MaterialCommunityIcons name="draw" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.inputBox}>
            <TextInput
              style={styles.input}
              onChangeText={setOpenAt}
              value={cOpenAt}
              placeholder="오픈날짜"
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
        <NavBar style={{ flex: 1 }} navigation={navigation} route={route} />
      </View>
    </View>
  );
}

export default CreateCapsuleScreen;
