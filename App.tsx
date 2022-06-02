/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/extensions */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
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
      require('./assets/navIcon/IMG_1405.png'),
      require('./assets/navIcon/IMG_1406.png'),
      require('./assets/navIcon/IMG_1407.png'),
      require('./assets/navIcon/IMG_1410.png'),
      require('./assets/navIcon/IMG_1411.png'),
      require('./assets/navIcon/IMG_1413.png'),
      require('./assets/navIcon/IMG_1414.png'),
      require('./assets/navIcon/IMG_1415.png'),
    ]);
  };

  useEffect(() => {
    (async function tmp() {
      await getImg();
      await Font.loadAsync({
        font1: require('./assets/fonts/UhBeeSeulvely.ttf'),
        font2: require('./assets/fonts/font2.ttf'),
        font3: require('./assets/fonts/font3.ttf'),
        font4: require('./assets/fonts/font4.ttf'),
      });

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
