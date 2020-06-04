import React from 'react';
import Campobase from './componentes/CampobaseComponent';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigureStore } from './redux/configureStore';
import  ConexionComponent  from './componentes/ConexionComponent';
const { store, persistor } = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Campobase />
          <ConexionComponent></ConexionComponent>
        </PersistGate>
      </Provider>
    );
  }
}


