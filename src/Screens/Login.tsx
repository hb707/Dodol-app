import React, { Props } from 'react';
import qs from 'querystring';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import axios from 'axios';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { storeUser } from '../Storages/storage';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;


const REST_API_KEY = '07e2741dea7ed6e8b2ba90e09024f231';
const REDIRECT_URI = 'http://43.200.42.181/api/user/login';

const userAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1';
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const requestToken = async (code: string, navigation: Props) => {
  const requestToeknUrl = 'https://kauth.kakao.com/oauth/token';
  const requestUserUrl = 'https://kapi.kakao.com/v1/user/access_token_info';
  let ACCESS_TOKEN: string;
  let body: object;

  const options = qs.stringify({
    grant_type: 'authorization_code',
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code,
  });

  try {
    const response = await axios.post(requestToeknUrl, options);
    ACCESS_TOKEN = response.data.access_token;

    body = {
      ACCESS_TOKEN,
      requestUserUrl,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
  } catch (e) {
    console.log('에러 발생', e);
  }

  try {
    const response = await axios.post(REDIRECT_URI, body);
    const value = response.data;
    await storeUser(value, navigation);
  } catch (e) {
    console.log(e);
  }
};

function LoginScreen({ navigation }: Props) {
  const getCode = (target: string) => {
    const exp = 'code=';
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      requestToken(requestCode, navigation);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        userAgent={userAgent}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </View>
  );
}
export default LoginScreen;
