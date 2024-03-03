import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';

import AddChartButton from '../components/AddChartButton';
import BasketList from '../components/BasketList';

const Basket = () => {
  const list = useSelector(state => state.basket);
  const [total, setTotal] = useState(0);
  const [basketList, setBasketList] = useState(list.basket);

  const getBasketList = async () => {
    if (list.basket) {
      setBasketList(list.basket);
      let tempTotal = 0;

      for (let i = 0; i < list.basket.length; i++) {
        const element = list.basket[i];
        tempTotal += Number(element.total);
      }
      setTotal(tempTotal);
    }
  };

  useEffect(() => {
    getBasketList();
  }, [list]);

  return (
    <SafeAreaView style={styles.container}>
      <BasketList
        list={basketList}
        total={total}
        setTotal={setTotal}
        isBasketList={true}
      />
      <View style={styles.bottomCon}>
        <View>
          <Text style={styles.priceText}>Total</Text>
          <Text style={styles.priceText2}>{total} ₺</Text>
        </View>
        <AddChartButton buttonText="Complete" onPress={() => {}} />
      </View>
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

export default Basket;
