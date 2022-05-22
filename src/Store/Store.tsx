import React, { ReactChild, ReactChildren } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../Reducers';
import rootSaga from '../Sagas';

const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware];
const enhancer = compose(applyMiddleware(...middleWares));
const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

interface IStoreProps {
  children: ReactChild | ReactChildren;
}

function Store({ children }: IStoreProps) {
  <Provider store={store}>{children}</Provider>;
}

export default Store;
