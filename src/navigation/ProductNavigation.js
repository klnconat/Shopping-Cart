import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import HomePage from '../pages/HomePage';
import ProductDetail from '../pages/ProductDetail';

const Stack = createStackNavigator();

const ProductNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={HomePage} options={{
        headerStyle:styles.headerStyle,
        headerTitle: 'E-Market',
        headerTintColor: '#FFFFFF'
      }} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={({route}) => ({
        headerStyle:styles.headerStyle,
        headerTitle: route.params?.headerTitle,
        headerTintColor: '#FFFFFF'
      })} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#2A59FE'
    }
});

export default ProductNavigation;
