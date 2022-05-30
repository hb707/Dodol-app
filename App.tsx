/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/extensions */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Asset } from 'expo-asset';
import Route from './src/Components/Route/Route';
import Store from './src/Store/Store';

function App() {
  const [isLoading, setisLoading] = useState(true);

  const getImg = async () => {
    await Asset.loadAsync([
      require('./assets/dodol_bg_list.jpg'),
      require('./assets/Home/jar.png'),
    ]);
  };

  useEffect(() => {
    (async function tmp() {
      await getImg();
      setTimeout(() => {
        setisLoading(false);
      }, 2000);
    })();
  });

  return (
    <>
      {isLoading ? (
        <Text>로딩페이지</Text>
      ) : (
        <Store>
          <Route />
        </Store>
      )}
    </>
  );
}

export default App;
