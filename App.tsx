/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/extensions */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Asset } from 'expo-asset';
import Loading from './src/Components/loading/loading';
import Route from './src/Components/Route/Route';
import Store from './src/Store/Store';

function App() {
  const [isLoading, setisLoading] = useState(true);

  const getImg = async () => {
    await Asset.loadAsync([
      require('./assets/dodol_bg_list.jpg'),
      require('./assets/Home/jar.png'),
      require('./assets/capsule_thumb_frame.png'),
      require('./assets/default_capsule_thumbnail.png'),
      require('./assets/capsule_title_bg.png'),
      require('./assets/capsule_date_bg.png'),
      require('./assets/polaroid.png'),
      require('./assets/paper.jpeg'),
    ]);
  };

  useEffect(() => {
    (async function tmp() {
      await getImg();
      setTimeout(() => {
        setisLoading(false);
      }, 2500);
    })();
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Store>
          <Route />
        </Store>
      )}
    </>
  );
}

export default App;
