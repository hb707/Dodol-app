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
    paddingTop: screen.height * 0.2,
  },
  mapBox: {
    flex: 5,
    width: screen.width * 0.9,
    height: screen.height * 0.9,
    borderWidth: 2,
    marginLeft: screen.width * 0.05,
    position: 'relative',
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
    width: screen.width * 0.7,
    height: screen.height * 0.05,
    marginLeft: screen.width * 0.15,
    padding: screen.height * 0.05,
  },
  address: {
    flex: 1,
    fontSize: screen.fontScale * 20,
  },
  closeBtn: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 100,
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
      <Button style={styles.closeBtn} title="close" onPress={closeModal} />
    </View>
  );
}

export default ModalLocation;
