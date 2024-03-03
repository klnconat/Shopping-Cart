/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {Provider} from 'react-redux';
import {store} from './src/redux/store/configureStore';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <BottomTabNavigation />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
