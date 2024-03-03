import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {setBasket} from '../redux/reducers/basketReducer';
import {setBadge} from '../redux/reducers/badgeReducer';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

const BasketItemList = props => {
  const number = useSelector(state => state.badge);
  const list = useSelector(state => state.basket);
  const dispatch = useDispatch();

  const [item, setItem] = useState(props.item);
  const [basketList, setBasketList] = useState(list.basket);

  const increment = () => {
    setItem({
      ...item,
      count: item.count + 1,
    });
    dispatch(setBadge(number.badge + 1));
    let copiedList = JSON.parse(JSON.stringify(basketList));
    let tempList = copiedList.filter(item => item.id != props.item.id);
    let foundProduct = copiedList.find(item => item.id == props.item.id);
    if (foundProduct) {
      foundProduct.total += Number(foundProduct.price);
      foundProduct.count = foundProduct.count + 1;
      tempList.push(foundProduct);
      dispatch(setBasket(tempList));
      dispatch(setBadge(number.badge + 1));
      setBasketList(tempList);
      AsyncStorage.setItem('basketList', JSON.stringify(tempList));
    }
    props.setTotal(props.total + Number(foundProduct.price));
  };
  const decrement = () => {
    if (item.count >= 1) {
      setItem({
        ...item,
        count: item.count - 1,
      });
      dispatch(setBadge(number.badge - 1));
      props.setTotal(props.total - Number(item.price));
      if (item.count - 1 == 0) {
        let copiedList = JSON.parse(JSON.stringify(basketList));
        let filtered = copiedList.filter(item => item.id != props.item.id);
        AsyncStorage.setItem('basketList', JSON.stringify(filtered));
        dispatch(setBasket(filtered));
        setBasketList(filtered);
      } else {
        let copiedList = JSON.parse(JSON.stringify(basketList));
        let tempList = copiedList.filter(item => item.id != props.item.id);
        let foundProduct = copiedList.find(item => item.id == props.item.id);
        let tempItem = foundProduct;
        if (foundProduct) {
          tempItem.total -= Number(foundProduct.price);
          tempItem.count = foundProduct.count - 1;
          tempList.push(tempItem);
          dispatch(setBasket(tempList));
          setBasketList(tempList);
          dispatch(setBadge(number.badge - 1));
          AsyncStorage.setItem('basketList', JSON.stringify(tempList));
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
      {props.isBasketList && (
        <View style={styles.container3}>
          <TouchableOpacity style={styles.minusCon} onPress={decrement}>
            <Text style={styles.minusPlusText}>-</Text>
          </TouchableOpacity>
          <View style={styles.countCon}>
            <Text style={styles.countText}>{item.count}</Text>
          </View>
          <TouchableOpacity style={styles.plusCon} onPress={increment}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default BasketItemList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  container2: {
    height: 45,
    justifyContent: 'center',
  },
  container3: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  minusCon: {
    height: 45,
    borderRadius: 2,
    backgroundColor: '#e5e5e5',
    width: Dimensions.get('window').width / 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countCon: {
    height: 45,
    backgroundColor: 'rgba(42, 89, 254, 1)',
    width: Dimensions.get('window').width / 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusCon: {
    height: 45,
    borderRadius: 2,
    backgroundColor: '#e5e5e5',
    width: Dimensions.get('window').width / 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 20,
  },
  priceText: {
    color: 'rgba(42, 89, 254, 1)',
    marginTop: 5,
  },
  minusPlusText: {
    fontSize: 16,
  },
  countText: {
    fontSize: 20,
    color: '#ffffff',
  },
});
