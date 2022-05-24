// import { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Pressable,
//   FlatList,
//   SafeAreaView,
//   Dimensions,
// } from 'react-native';
// // import Location from '../Location/Location';
// import type { NativeStackScreenProps } from 'react-navigation/native-stack';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import ThumbPicker from './ThumbPicker';
// import NavBar from '../Components/NavBar/NavBar';

// const screenWidth = Math.round(Dimensions.get('window').width);
// const Pages = [{num:1,color:'red'},{num:2,color:'red'},{num:3,color:'red'}];

// function CreateCapsuleScreen({ navigation, route }: NativeStackScreenProps) {
//   const [cName, setcName] = useState();
//   const [cDesc, setcDesc] = useState();
//   const [clocation, setcLocation] = useState();

//   function renderItem(item) {
//     return(
//       <Text>{item.num}</Text>
//     )
//   }

//   return (
//     <View>
//       <FlatList
//         data={Pages}
//         renderItem={renderItem(Pages)}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     paddingTop: '35%',
//   },
//   horizontalContainer:{
//     flex: 1,
//     flexDirection: 'column'
//   },
//   page:{
//     width: '100%'
//   },
//   inputBox: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     width: '80%',
//     borderBottomWidth: 1,
//     borderColor: 'black',
//     fontSize: 20,
//     margin: '5%'
//   },
//   navBar: {
//     flex: 0.1,
//   },
//   test:{
//     flex: 1,
//     fontSize:200
//   }
// });

// export default CreateCapsuleScreen;
