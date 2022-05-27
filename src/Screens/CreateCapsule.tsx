import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
// import Location from '../Location/Location';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThumbPicker from './ThumbPicker';
import NavBar from '../Components/NavBar/NavBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: '35%',
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
    width: '80%',
    borderBottomWidth: 1,
    borderColor: 'black',
    fontSize: 20,
    margin: '5%',
  },
  navBar: {
    flex: 0.1,
  },
  test: {
    flex: 1,
    fontSize: 200,
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
  const [clocation, setcLocation] = useState();

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
              onChangeText={setcDesc}
              value={cDesc}
              placeholder="위치"
            />
            <MaterialCommunityIcons name="draw" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.page}>
          <Text style={styles.test}>hey</Text>
        </View>
        <View style={styles.page}>
          <Text>hey</Text>
        </View>
      </ScrollView>
      <View style={styles.navBar}>
        <NavBar style={{ flex: 1 }} navigation={navigation} route={route} />
      </View>
    </View>
  );
}

export default CreateCapsuleScreen;
