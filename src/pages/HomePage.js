import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {setBasket} from '../redux/reducers/basketReducer';
import {setBadge} from '../redux/reducers/badgeReducer';
import {setFavorite} from '../redux/reducers/favoriteReducer';
import {useDispatch} from 'react-redux';

import productService from '../services/product-service';

import SearchField from '../components/SearchField';
import List from '../components/List';
import FilterModal from '../components/FilterModal';

const HomePage = () => {
  const dispatch = useDispatch();

  const [productList, setProductList] = useState([]);
  const [storedProductList, setStoredProductList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const onChangeText = text => {
    if (text) {
      setSearchText(text);
      let filteredArray = storedProductList.filter(item =>
        item.name.toLowerCase().includes(text),
      );
      setProductList(filteredArray);
    } else {
      setSearchText('');
      setProductList(storedProductList);
    }
  };

  const getProductList = async () => {
    let basketList = await AsyncStorage.getItem('basketList');
    let favoriteList = await AsyncStorage.getItem('favoriteList');
    let parsedBasketList = JSON.parse(basketList);
    let parsedFavList = JSON.parse(favoriteList);
    dispatch(setBasket(parsedBasketList));
    dispatch(setFavorite(parsedFavList));

    if (parsedBasketList) {
      let count = 0;
      for (let i = 0; i < parsedBasketList.length; i++) {
        const element = parsedBasketList[i];
        count += element.count;
      }
      dispatch(setBadge(count));
    }

    productService
      .getProductList()
      .then(res => {
        setProductList(res.data);
        setStoredProductList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchField onChangeText={onChangeText} search={searchText} />
      <View style={styles.filterCon}>
        <Text style={styles.filterText}>Filters:</Text>
        <TouchableOpacity
          style={styles.selectFilterBox}
          onPress={() => {
            setIsFilterModalOpen(true);
          }}>
          <Text style={styles.selectFilterText}>Select Filter</Text>
        </TouchableOpacity>
      </View>
      <List list={productList} />
      <Modal
        visible={isFilterModalOpen}
        onRequestClose={() => {
          setIsFilterModalOpen(false);
        }}>
        <FilterModal
          storedProductList={storedProductList}
          productList={productList}
          setProductList={setProductList}
          setIsFilterModalOpen={setIsFilterModalOpen}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  filterCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterText: {
    width: Dimensions.get('window').width / 3,
    color: 'rgba(0, 0, 0, 1)',
  },
  selectFilterBox: {
    backgroundColor: 'rgba(217, 217, 217, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    width: Dimensions.get('window').width / 3,
  },
  selectFilterText: {
    color: 'rgba(0, 0, 0, 1)',
  },
});

export default HomePage;
