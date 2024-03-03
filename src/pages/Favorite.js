import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';

import BasketList from '../components/BasketList';

const Favorite = () => {
  const list = useSelector(state => state.favorite);

  return (
    <SafeAreaView style={styles.container}>
      <BasketList list={list.favorite} isBasketList={false} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  bottomCon: {
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  priceText: {
    color: 'rgba(42, 89, 254, 1)',
    fontSize: 15,
  },
  priceText2: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
export default Favorite;
