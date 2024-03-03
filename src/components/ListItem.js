import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {setFavorite} from '../redux/reducers/favoriteReducer';
import {setBasket} from '../redux/reducers/basketReducer';
import {setBadge} from '../redux/reducers/badgeReducer';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

import AddChartButton from './AddChartButton';

import Ionicons from 'react-native-vector-icons/Ionicons';

const ListItem = props => {
  const number = useSelector(state => state.badge);
  const list = useSelector(state => state.favorite);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [starColor, setStarColor] = useState('rgba(217, 217, 217, 1)');

  const onPressButton = () => {
    let copiedList = JSON.parse(JSON.stringify(props.basketList));
    let tempList = props.basketList.filter(item => item.id != props.item.id);
    if (copiedList.length) {
      copiedList.find(item => {
        if (item.id == props.item.id) {
          let tempItem = item;
          tempItem.total += Number(item.price);
          tempItem.count = item.count + 1;
          tempList.push(tempItem);
          dispatch(setBasket(tempList));
          dispatch(setBadge(number.badge + 1));
          AsyncStorage.setItem('basketList', JSON.stringify(tempList));
        } else {
          props.item.count = 1;
          props.item.total = Number(props.item.price);
          copiedList.push(props.item);
          dispatch(setBasket(copiedList));
          dispatch(setBadge(number.badge + 1));
          AsyncStorage.setItem('basketList', JSON.stringify(copiedList));
        }
      });
    } else {
      props.item.count = 1;
      props.item.total = Number(props.item.price);
      copiedList.push(props.item);
      dispatch(setBasket(copiedList));
      dispatch(setBadge(number.badge + 1));
      AsyncStorage.setItem('basketList', JSON.stringify(copiedList));
    }
  };
  const onPressStarIcon = () => {
    if (list.favorite?.some(elem => elem.id == props.item.id)) {
      setStarColor('rgba(217, 217, 217, 1)');
      let tempList = list.favorite.filter(item => item.id != props.item.id);
      dispatch(setFavorite(tempList));
    } else {
      setStarColor('rgba(255, 184, 0, 1)');
      let copiedList = JSON.parse(JSON.stringify(list.favorite));
      if (copiedList) {
        let tempList = copiedList;
        tempList.push(props.item);
        dispatch(setFavorite(tempList));
      } else {
        dispatch(setFavorite([props.item]));
      }
    }
  };
  const onNavigate = () => {
    navigation.navigate('ProductDetail', {
      element: props.item,
      starColor: starColor,
      basketList: props.basketList,
      setBasketList: props.setBasketList,
    });
  }

  return (
    <TouchableOpacity
      style={styles.box}
      onPress={onNavigate}>
      <Image source={{uri: props.item.image}} style={styles.image} />
      <TouchableOpacity
        onPress={onPressStarIcon}
        style={styles.starCon}>
        <Ionicons
          name="star-outline"
          color={starColor}
          backgroundColor="white"
          size={25}
        />
      </TouchableOpacity>
      <Text style={styles.priceText}>{props.item.price} ₺</Text>
      <Text style={styles.nameText}>{props.item.name}</Text>
      <AddChartButton buttonText="Add to Cart" onPress={onPressButton} />
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  box: {
    padding: 10,
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    margin: 10,
  },
  image: {
    height: Dimensions.get('window').width / 3,
  },
  priceText: {
    color: 'rgba(42, 89, 254, 1)',
    marginVertical: 10,
  },
  nameText: {
    color: 'rgba(0, 0, 0, 1)',
  },
  starCon: {position: 'absolute', top: 15, right: 15}
});
