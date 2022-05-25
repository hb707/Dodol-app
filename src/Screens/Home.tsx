import React from 'react';
import { View, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavBar from '../Components/NavBar/NavBar';
import Main from './Main';

function HomeScreen({ navigation, route }: NativeStackScreenProps) {
  return <Main navigation={navigation} route={route} />;
}

// import React from 'react';
// import {WebView} from 'react-native-webview';
// import {StyleSheet, Button, Image, Pressable, View} from 'react-native';
// import axios from 'axios';

// const styles = StyleSheet.create({
//   kakaologin: {
//     flex: 1,
//   },
// });
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// const REST_API_KEY = '07e2741dea7ed6e8b2ba90e09024f231';
// const REDIRECT_URI = 'http://43.200.42.181/';

// const INJECTED_JAVASCRIPT = `(function() {
//   console.log('a')
//   window.ReactNativeWebView.postMessage(JSON.parse(window.location));
// })();`;
// const requestToken = async code => {
//   const returnValue = 'none';
//   const requestToeknUrl = 'https://kauth.kakao.com/oauth/token';

//   const options = {
//     grant_type: 'authorization_code',
//     client_id: REST_API_KEY,
//     redirect_uri: REDIRECT_URI,
//     code,
//   };
//   try {
//     const response = await axios.post(request_toekn_url, options);
//     const result = response.data.access_token;
//     console.log(result);
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// function HomeScreen() {
//   const LoginProcess = target => {
//     console.log('login process');
//     const exp = 'code=';
//     const condition = target.indexOf(exp);
//     if (condition !== -1) {
//       const requestCode = target.substring(condition + exp.length);
//       console.log(requestCode);
//       requestToken(requestCode);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {/* <Pressable>
//         <Image
//           style={styles.kakaologin}
//           source={{uri:'/Users/ivy/Documents/workspace/2022/React/20220521/my-project/kakao_login_medium_narrow.png'}}
//         />
//       </Pressable> */}
//       <WebView
//         style={{ flex: 1 }}
//         originWhitelist={['*']}
//         scalesPageToFit={false}
//         source={{
//           uri:
//             // `http://127.0.0.1/oauth/kakao`
//             `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
//           // `https://www.naver.com`
//         }}
//         injectedJavaScript={INJECTED_JAVASCRIPT} // View가 로드될 때 자바스크립트를 웹 페이지에 주입해준다.
//         javaScriptEnabled // -WebView에서 자바스크립트를 사용할 수 있게 해주는 것. default값은 true
//         onMessage={e => {
//           console.log('hey3');
//           LoginProcess(e.nativeEvent[`http://43.200.42.181/`]);
//           // const data = JSON.parse(e.nativeEvent.data)
//         }}
//       />
//     </View>
//   );
// }

export default HomeScreen;
