import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import ListItem from './ListItem';

const List = (props) => {
  const list = useSelector(state => state.basket);
  const [basketList, setBasketList] = useState([]);

  const getBasketList = async () => {
    if (list.basket) {
      setBasketList(list.basket);
    }
  };

  useEffect(() => {
    
    getBasketList();
  }, [list]);

  return (
    <SafeAreaView style={styles.flex}>
      <FlatList
          data={props.list}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <ListItem
                item={item}
                basketList={basketList}
                setBasketList={setBasketList}
              />
            );
          }}
        />
    </SafeAreaView>
  )
}

export default List

const styles = StyleSheet.create({
  flex: {flex: 1}
})