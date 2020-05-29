import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';
import { favoritos } from './favoritos';
import { persistStore, persistReducer } from 'redux-persist'
import ExpoFileSystemStorage from "redux-persist-expo-filesystem"

const persistConfig = {
    key: 'root',
    storage: ExpoFileSystemStorage,
    whitelist: ['favoritos']
}

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        excursiones,
        comentarios,
        cabeceras,
        actividades,
        favoritos
    })
)

export const ConfigureStore = () => {
    const store = createStore(
        persistedReducer,
        applyMiddleware(thunk)
    );

    persistor = persistStore(store)

    return { store, persistor };
}