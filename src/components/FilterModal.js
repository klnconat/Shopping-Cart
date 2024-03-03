import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import React, {useState} from 'react';

import SearchField from './SearchField';

import AntDesign from 'react-native-vector-icons/AntDesign';

const FilterModal = props => {
  const [sortIndex, setSortIndex] = useState(null);
  const [selectedFilterList, setSelectedFilterList] = useState([]);
  const [brandList, setBrandList] = useState(props.storedProductList);
  const [modelList, setModelList] = useState(props.storedProductList);
  const [brandName, setBrandName] = useState('');
  const [modelName, setModelName] = useState('');

  const onClose = () => {
    props.setIsFilterModalOpen(false);
  };
  const sortList = param => {
    if (param == 'old') {
      let tempArr = [...props.productList].sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt),
      );
      props.setProductList(tempArr);
    } else if (param == 'new') {
      let tempArr = [...props.productList].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      );
      props.setProductList(tempArr);
    } else if (param == 'low') {
      let tempArr = [...props.productList].sort((a, b) =>
        a.price.localeCompare(b.price),
      );
      props.setProductList(tempArr);
    } else if (param == 'high') {
      let tempArr = [...props.productList].sort((a, b) =>
        b.price.localeCompare(a.price),
      );
      props.setProductList(tempArr);
    }
  };
  const filterList = param => {
    let tempArr = props.storedProductList.filter(
      item => param.includes(item.brand) || param.includes(item.model),
    );
    props.setProductList(tempArr);
  };
  const resetSelection = () => {
    props.setProductList(props.storedProductList);
    setSelectedFilterList([]);
    setSortIndex(null);
  };
  const searchBrandName = (text) => {
    if (text) {
      setBrandName(text);
      let filteredArray = brandList.filter(item =>
        item.brand.toLowerCase().includes(text),
      );
      let uniqueList = Object.values(filteredArray.reduce((acc, obj) => ({ ...acc, [obj.brand]: obj }), {}));
      setBrandList(uniqueList);
    } else {
      setBrandName('');
      setBrandList(props.storedProductList);
    }
  };
  const searchModelName = (text) => {
    if (text) {
      setModelName(text);
      let filteredArray = modelList.filter(item =>
        item.model.toLowerCase().includes(text),
      );
      let uniqueList = Object.values(filteredArray.reduce((acc, obj) => ({ ...acc, [obj.model]: obj }), {}));
      setModelList(uniqueList);
    } else {
      setModelName('');
      setModelList(props.storedProductList);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.modelBox}>
        <TouchableOpacity onPress={onClose}>
          <AntDesign name={'close'} size={24} />
        </TouchableOpacity>
        <Text style={styles.filterText}>Filter</Text>
        <Text />
      </View>
      <Text style={styles.filterHeader}>Sort by:</Text>
      <CheckBox
        title="Old to new"
        checked={sortIndex == 0}
        onPress={() => {
          sortList('old');
          setSortIndex(0);
        }}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        containerStyle={styles.checkBoxCon}
      />
      <CheckBox
        title="New to old"
        checked={sortIndex == 1}
        onPress={() => {
          sortList('new');
          setSortIndex(1);
        }}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        containerStyle={styles.checkBoxCon}
      />
      <CheckBox
        title="Price high to low"
        checked={sortIndex == 2}
        onPress={() => {
          sortList('high');
          setSortIndex(2);
        }}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        containerStyle={styles.checkBoxCon}
      />
      <CheckBox
        title="Price low to to"
        checked={sortIndex == 3}
        onPress={() => {
          sortList('low');
          setSortIndex(3);
        }}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        containerStyle={styles.checkBoxCon}
      />
      <View style={styles.separator} />
      <Text style={styles.filterHeader}>Brand:</Text>
      <SearchField onChangeText={searchBrandName} search={brandName}/>
      <View style={styles.container}>
        <FlatList
          data={brandList}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <CheckBox
                title={item.brand}
                onPress={() => {
                  if (selectedFilterList.includes(item.brand)) {
                    let tempArr = selectedFilterList;
                    tempArr = tempArr.filter(elem => elem != item.brand);
                    filterList(tempArr);
                    setSelectedFilterList(tempArr);
                  } else {
                    let tempArr = selectedFilterList;
                    tempArr.push(item.brand);
                    filterList(tempArr);
                    setSelectedFilterList(tempArr);
                  }
                }}
                checked={selectedFilterList.includes(item.brand)}
                checkedIcon="check-square-o"
                uncheckedIcon="square-o"
                containerStyle={styles.checkBoxBackground}
              />
            );
          }}
          style={styles.height150}
          contentContainerStyle={styles.flexGrow}
        />
      </View>
      <View style={styles.separator} />
      <Text style={styles.filterHeader}>Model:</Text>
      <SearchField onChangeText={searchModelName} search={modelName}/>
      <FlatList
        data={modelList}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <CheckBox
              title={item.model}
              onPress={() => {
                if (selectedFilterList.includes(item.model)) {
                  let tempArr = selectedFilterList;
                  tempArr = tempArr.filter(elem => elem != item.model);
                  filterList(tempArr);
                  setSelectedFilterList(tempArr);
                } else {
                  let tempArr = selectedFilterList;
                  tempArr.push(item.model);
                  filterList(tempArr);
                  setSelectedFilterList(tempArr);
                }
              }}
              checked={selectedFilterList.includes(item.model)}
              checkedIcon="check-square-o"
              uncheckedIcon="square-o"
              containerStyle={styles.checkBoxBackground}
            />
          );
        }}
        style={styles.modelFlatListCon}
      />
      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={resetSelection}>
          <Text style={styles.text}>Primary</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    width: '95%',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  flexGrow: {
    flexGrow: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  touchableOpacity: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A59FE',
    paddingVertical: 15,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  modelBox: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  filterText: {fontSize: 20, fontWeight: 'bold'},
  filterHeader: {marginVertical: 10, marginLeft: 10},
  checkBoxCon: {backgroundColor: 'white', borderColor: 'white', margin: 0},
  checkBoxBackground: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  height150: {height: 150},
  modelFlatListCon: {height: 150, flex: 1},
});
