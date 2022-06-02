/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/extensions */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
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
      require('./assets/capsule/openCapsule0.png'),
      require('./assets/capsule/openCapsule1.png'),
      require('./assets/capsule/openCapsule2.png'),
      require('./assets/capsule/openCapsule3.png'),
      require('./assets/capsule/openCapsule4.png'),
      require('./assets/capsule/openCapsule5.png'),
      require('./assets/capsule/openCapsule6.png'),
      require('./assets/capsule/openCapsule7.png'),
      require('./assets/capsule/openCapsule8.png'),
      require('./assets/capsule/openCapsule9.png'),
      require('./assets/openDateLabel.png'),
      require('./assets/openLocationLabel.png'),
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
