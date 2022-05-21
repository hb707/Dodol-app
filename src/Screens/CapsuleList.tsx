import { View, Text } from 'react-native';
import NavBar from '../Components/NavBar/NavBar';

function CapsuleListScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 12, justifyContent: 'center' }}>
        <Text> 캡슐리스트 페이지 </Text>
      </View>
      <NavBar style={{ flex: 1 }} navigation={navigation} route={route} />
    </View>
  );
}

export default CapsuleListScreen;
