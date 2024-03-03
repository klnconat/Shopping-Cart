import {StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';

const AddChartButton = (props) => {
  return (
    <TouchableOpacity style={styles.box} onPress={props.onPress}>
      <Text style={styles.addToCartText}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};

export default AddChartButton;

const styles = StyleSheet.create({
  box: {
    height: 36,
    width: Dimensions.get('window').width / 3,
    backgroundColor: '#2A59FE',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 10,
    alignSelf: 'center'
  },
  addToCartText: {
    color: '#FFFFFF'
  }
});
