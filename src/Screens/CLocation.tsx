import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import { backUrl } from '../types';
import { storeSpot } from '../Storages/storage';
import marker from '../../assets/marker.png';

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingTop: screen.height * 0.1,
  },
  setSpot: {
    fontSize: screen.fontScale * 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    fontFamily: 'font1',
    letterSpacing: 3,
  },
  mapBox: {
    flex: 5,
    width: screen.width * 0.9,
    borderWidth: 3,
    marginLeft: screen.width * 0.05,
    borderRadius: 10,
    position: 'relative',
    marginVertical: 12,
  },
  marker: {
    position: 'absolute',
    width: screen.width * 0.1,
    height: screen.width * 0.1,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  addressBox: {
    flex: 1,
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 15,
    width: screen.width * 0.9,
    marginLeft: screen.width * 0.05,
    backgroundColor: '#e4c86c',
  },
  address: {
    fontSize: screen.fontScale * 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    fontFamily: 'font1',
    letterSpacing: 5,
  },
  closeBtn: {
    borderColor: '#000000',
    borderRadius: 15,
    borderWidth: 3,
    marginVertical: 15,
    width: screen.width * 0.9,
    marginLeft: screen.width * 0.05,
    backgroundColor: '#815854',
  },
  close: {
    fontSize: screen.fontScale * 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    fontFamily: 'font1',
    letterSpacing: 3,
  },
});

const REST_API_KEY = '07e2741dea7ed6e8b2ba90e09024f231';

export interface ILocation {
  longitude: number;
  latitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  cAddress: string;
}

interface ILocationForParameter {
  longitude: number;
  latitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

function ModalLocation({
  setModalVisible,
}: {
  setModalVisible: (flag: boolean) => void;
}) {
  const initialRegion: ILocation = {
    longitude: Number(127.00634649077266),
    latitude: Number(37.563817018270434),
    latitudeDelta: Number(0.1857534755372825),
    longitudeDelta: Number(0.2738749137452601),
  };
  const [cSpot, setcSpot] = useState<ILocationForParameter>(initialRegion);
  const [cAddress, setcAddress] = useState('퇴계로');

  const getAdress = async () => {
    try {
      const options = {
        location: {
          latitude: cSpot.latitude,
          longitude: cSpot.longitude,
        },
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY} `,
        },
      };

      const response = await axios.post(
        `${backUrl}/api/location/list`,
        options,
      );
      const locationList: any = response.data;
      const address = locationList.documents[0].address.address_name;
      const roadAdress = locationList.documents[0].road_address;

      if (roadAdress !== null && roadAdress.main_building_no !== null) {
        setcAddress(`${roadAdress.road_name} ${roadAdress.main_building_no}`);
      } else {
        setcAddress(address);
      }
    } catch (e) {
      console.log(e, '액시오스 에러');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    getAdress();
  }, [cSpot]);

  return (
    <View style={styles.container}>
      <Text style={styles.setSpot}>캡슐을 뭍을 위치를 지정해주세요</Text>
      <View style={styles.mapBox}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={cSpot}
          onRegionChangeComplete={(location: ILocationForParameter) => {
            setcSpot(location);
            storeSpot({ ...cSpot, cAddress });
          }}
        />
        <Image source={marker} style={styles.marker} resizeMode="contain" />
      </View>
      <View style={styles.addressBox}>
        <Text style={styles.address}>{cAddress}</Text>
      </View>
      <View style={styles.closeBtn}>
        <Pressable onPress={closeModal}>
          <Text style={styles.close}>위치 설정 완료! 팝업 닫기 !</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default ModalLocation;
