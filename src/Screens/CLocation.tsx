import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import { backUrl } from '../types';
import { storeSpot } from '../Storages/storage';

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
  const initialRegion = {
    longitude: Number(126.9334126801552),
    latitude: Number(37.54421644102267),
    latitudeDelta: Number(0.1857534755372825),
    longitudeDelta: Number(0.2738749137452601),
  };
  const [searchLocation, setSearchLocation] = useState();
  // const [searchedSpot, setSearchedSpot] = useState();
  const [cSpot, setcSpot] = useState(initialRegion);

  // useEffect(storeSpot(cSpot), [cSpot])

  // 검색 후 나온 배열 중 첫번째 배열의 long / lati 값이 들어감
  const searchedSpot = [];
  async function showLocation(arr) {
    await arr.map(v => searchedSpot.push({ x: v.x, y: v.y }));
    setcSpot({
      longitude: Number(searchedSpot[0].y),
      latitude: Number(searchedSpot[0].x),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }

  // 검색 시 시 실행됨
  const requestLocation = async () => {
    try {
      const options = {
        location: searchLocation,
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
        onChangeText={setSearchLocation}
        value={searchLocation}
        placeholder="위치를 입력해주세요"
      />
      <Button title="검색" onPress={requestLocation} />
      <View style={styles.mapBox}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={initialRegion}
          onRegionChangeComplete={location => {
            setcSpot(location);
            storeSpot(cSpot);
          }}
        />
        <Marker
          draggable
          coordinate={{ latitude: cSpot.latitude, longitude: cSpot.latitude }}
          title="this is a marker"
          description="this is a marker example"
        />
      </View>
      <Button style={styles.closeBtn} title="close" onPress={closeModal} />
    </View>
  );
}

export default ModalLocation;
