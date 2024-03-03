import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import React from 'react'

import BasketItemList from './BasketItemList';

const BasketList = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
          data={props.list}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <BasketItemList
                list={props.list}
                item={item}
                total={props.total}
                setTotal={props.setTotal}
                isBasketList={props.isBasketList}
              />
            );
          }}
        />
    </SafeAreaView>
  )
}

export default BasketList

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    }
})