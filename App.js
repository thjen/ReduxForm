import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import ContactForm from './src/components/ContactForm';

const reducers = combineReducers({
  form: formReducer,
});
const store = createStore(reducers);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ContactForm />
      </Provider>
    );
  }
}
