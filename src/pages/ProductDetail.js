import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setBasket} from '../redux/reducers/basketReducer';
import {setBadge} from '../redux/reducers/badgeReducer';

import AddChartButton from '../components/AddChartButton';

import productService from '../services/product-service';

import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductDetail = props => {
  const number = useSelector(state => state.badge);
  const dispatch = useDispatch();
  const {element, starColor, basketList, setBasketList} = props.route.params;

  const [product, setProduct] = useState({});
  const [imageSize, setImageSize] = useState({
    height: 0,
    width: Dimensions.get('window').width,
  });

  const scaleHeight = ({source, desiredWidth}) => {
    Image.getSize(source, (width, height) => {
      setImageSize({
        width: desiredWidth,
        height: (desiredWidth / width) * height,
      });
    });
  };

  const onPressButton = async () => {
    debugger;
    let list = await AsyncStorage.getItem('basketList');
    let copiedList = JSON.parse(list);
    let tempList = basketList.filter(item => item.id != element.id);
    if (copiedList?.length) {
      copiedList.find(item => {
        if (item.id == element.id) {
          let tempItem = item;
          tempItem.total += Number(item.price);
          tempItem.count = item.count + 1;
          tempList.push(tempItem);
          dispatch(setBasket(tempList));
          dispatch(setBadge(number.badge + 1));
          setBasketList(tempList);
          AsyncStorage.setItem('basketList', JSON.stringify(tempList));
        } else {
          element.count = 1;
          element.total = Number(element.price);
          copiedList.push(element);
          dispatch(setBasket(copiedList));
          dispatch(setBadge(number.badge + 1));
          setBasketList(copiedList);
          AsyncStorage.setItem('basketList', JSON.stringify(copiedList));
        }
      });
    } else {
      copiedList = [];
      element.count = 1;
      element.total = Number(element.price);
      copiedList.push(element);
      dispatch(setBasket(copiedList));
      dispatch(setBadge(number.badge + 1));
      setBasketList(copiedList);
      AsyncStorage.setItem('basketList', JSON.stringify(copiedList));
    }
  };

  //item direkt olarak listeden çekilebilirdi ancak detay sayfalarında genel olarak id ile istek atıp
  //item'ın detaylarına ulaşıyoruz o yüzden ben de
  //bunu göstrebilmek adına bu isteği yazdım
  const getProductDetail = async () => {
    productService
      .getProductDetail(element.id)
      .then(res => {
        setProduct(res.data);
        scaleHeight({
          source: res.data.image,
          desiredWidth: Dimensions.get('window').width - 40,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Image
          source={{uri: product.image}}
          style={styles.image}
          height={imageSize.height}
          width={imageSize.width}
        />
        <TouchableOpacity
          onPress={() => {
            setStarColor('rgba(255, 184, 0, 1)');
          }}
          style={styles.starStyle}>
          <Ionicons
            name="star-outline"
            color={starColor}
            backgroundColor="white"
            size={25}
          />
        </TouchableOpacity>
        <Text style={styles.nameText}>{product.name}</Text>
        <Text style={styles.descText}>{product.description}</Text>
        <View style={styles.bottomCon}>
          <View>
            <Text style={styles.priceText}>Price</Text>
            <Text style={styles.priceText2}>{product.price} ₺</Text>
          </View>
          <AddChartButton buttonText="Add to Cart" onPress={onPressButton} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container2: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  image: {
    marginHorizontal: 0,
    resizeMode: 'contain',
  },
  descText: {
    color: 'black',
    textAlign: 'justify',
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
  nameText: {
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
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
  starStyle: {position: 'absolute', top: 15, right: 30},
});

export default ProductDetail;
