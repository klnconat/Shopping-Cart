import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

import ProductNavigation from '../navigation/ProductNavigation';
import Basket from '../pages/Basket';
import Profile from '../pages/Profile';
import Favorite from '../pages/Favorite';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const number = useSelector(state => state.badge);
  
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={ProductNavigation}
        options={{
          tabBarIcon: () => <Ionicons name={'home-outline'} size={24} />,
          tabBarLabel: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Basket"
        component={Basket}
        options={{
          tabBarIcon: () => <Ionicons name={'basket-outline'} size={24} />,
          tabBarLabel: '',
          headerStyle: styles.headerStyle,
          headerTitle: 'E-Market',
          headerTintColor: '#FFFFFF',
          tabBarBadge: number.badge,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: () => <Ionicons name={'star-outline'} size={24} />,
          tabBarLabel: '',
          headerStyle: styles.headerStyle,
          headerTitle: 'Favorite',
          headerTintColor: '#FFFFFF',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => <AntDesign name={'user'} size={24} />,
          tabBarLabel: '',
          headerStyle: styles.headerStyle,
          headerTitle: 'Profile',
          headerTintColor: '#FFFFFF',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#2A59FE',
  },
});

export default BottomTabNavigation;
