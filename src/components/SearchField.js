import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SearchBar} from 'react-native-elements';

const SearchField = props => {
  return (
    <SearchBar
      placeholder="Search"
      onChangeText={props.onChangeText}
      value={props.search}
      inputContainerStyle={styles.searchStyle}
      leftIconContainerStyle={styles.searchStyle}
      inputStyle={styles.searchStyle}
      containerStyle={styles.containerStyle}
    />
  );
};

export default SearchField;

const styles = StyleSheet.create({
  searchStyle: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8
  },
  containerStyle: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});
