import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Button,
} from 'react-native';
// import Location from '../Location/Location';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import ThumbPicker from './ThumbPicker';
import NavBar from '../Components/NavBar/NavBar';
import { create_R } from '../Reducers/capsule';
import { getUser } from '../Storages/storage';
import { IState } from '../types';

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

function CreateCapsuleScreen({ navigation, route }: Props) {
  const [cName, setcName] = useState();
  const [cDesc, setcDesc] = useState();
  const [cLocation, setcLocation] = useState();
  const [cCollaborator, setcCollaborator] = useState();
  const [cOpenAt, setOpenAt] = useState();

  let capsule;
  const dispatch = useDispatch();

  const SubmitHandler = async () => {
    const cGenerator: object = await getUser();
    capsule = {
      cGenerator,
      cName,
      cDesc,
      cLocation,
      cCollaborator,
      cOpenAt,
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

          <Pressable style={styles.inputBox}>
            <TextInput
              style={styles.input}
              onChangeText={setcLocation}
              value={cLocation}
              placeholder="위치"
            />
            <MaterialCommunityIcons name="draw" size={24} color="black" />
          </Pressable>
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
