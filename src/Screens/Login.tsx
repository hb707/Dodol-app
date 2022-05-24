import { WebView } from 'react-native-webview';
import { StyleSheet, Button, Image, Pressable, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kakaologin: {
    flex: 1,
  },
});

const REST_API_KEY = '07e2741dea7ed6e8b2ba90e09024f231';
const REDIRECT_URI = 'http://localhost:3001/oauth/kakao';

function Login() {
  const runFrist = `
    setTimeout(()=>{window.alert('hi)},2000)
  `;

  return (
    <View style={styles.container}>
      <Pressable>
        <Image
          style={styles.kakaologin}
          source={{
            uri: '/Users/ivy/Documents/workspace/2022/React/20220521/my-project/kakao_login_medium_narrow.png',
          }}
        />
      </Pressable>
      {/* <WebView
        originWhitelist={['*']}
        source={{
          uri:
            `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
        }}
        injectedJavaScript={runFrist}
      /> */}
    </View>
  );
}

export default Login;
