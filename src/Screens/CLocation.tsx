import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';
import MapView from 'react-native-maps';
import { backUrl } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  inputBox: {
    width: '70%',
    borderBottomWidth: 1,
    borderColor: 'black',
    fontSize: 20,
    margin: '5%',
  },
  mapBox: {
    width: 350,
    height: 300,
    borderColor: 'red',
    borderWidth: 2,
    marginLeft: 30,
  },
  closeBtn: {
    backgroundColor: 'white',
    fontSize: 100,
  },
});

const REST_API_KEY = '07e2741dea7ed6e8b2ba90e09024f231';

function ModalLocation({ setModalVisible }) {
  const [cSearchLocation, setcSearchLocation] = useState();
  const [spot, setSpot] = useState();

  const searchedSpot = [];
  function showLocation(arr) {
    arr.map(v => searchedSpot.push({ x: v.x, y: v.y }));
    setSpot({
      longitude: Number(searchedSpot[0].x),
      latitude: Number(searchedSpot[0].y),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }

  const requestLocation = async () => {
    try {
      const options = {
        location: cSearchLocation,
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY} `,
        },
      };
      const response = await axios.post(
        `${backUrl}/api/location/list`,
        options,
      );
      const locationList = response.data.documents;

      showLocation(locationList);
    } catch (e) {
      console.log(e, '액시오스 에러');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        onChangeText={setcSearchLocation}
        value={cSearchLocation}
        placeholder="위치를 입력해주세요"
      />
      <Button title="검색" onPress={requestLocation} />
      <View style={styles.mapBox}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={spot}
          onRegionChange={setSpot}
        />
      </View>
      <Button style={styles.closeBtn} title="close" onPress={closeModal} />
    </View>
  );
}

export default ModalLocation;
