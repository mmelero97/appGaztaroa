import * as ActionTypes from './ActionTypes';
import database from '@react-native-firebase/database';
import * as firebase from 'firebase';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMENTARIO:
      action.payload.id = state.comentarios.length
      state.comentarios.push(action.payload)
      firebase.database().ref('/comentarios').set(state.comentarios)
      //firebase.database().ref(comentarios).set(atributos)

      return {...state, errMess:null, comentarios: state.comentarios};

    default:
      return state;
  }
};