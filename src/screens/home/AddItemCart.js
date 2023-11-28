import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, setProduct} from '../../redux/Reducer/AuthReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useIsFocused} from '@react-navigation/native';
import {HomeStyles} from './style';

let addCardProducts = [];

const AddItemCart = ({navigation, route}) => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const isFocused = useIsFocused();
  const flatRef = useRef(null);
  const [addedTocart, setAddedTocart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const renderHiddenItem = data => {
    return (
      <View style={HomeStyles.hiddenContainer}>
        <TouchableOpacity
          style={HomeStyles.hiddenBtnCon}
          onPress={() => {
            handleDelete(data?.index, data?.item);
          }}
          activeOpacity={0.8}>
          <Image
            source={Icons.delete1}
            resizeMode={'contain'}
            style={{
              height: normalize(20),
              width: normalize(20),
              tintColor: Colors.black,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleDelete = (_index, _item) => {
    const _newArr = [...addedTocart];
    const _in = _newArr?.findIndex(i => i.id == _item.id);
    _newArr.splice(_in, 1);

    const _d = [...AuthReducer?.addProduct];
    const _index1 = _d.findIndex(i => i.id == _item.id);
    const currentItem = _d[_index1];
    const _currentStatus = currentItem?.isAdded ?? false;
    _d[_index1] = {...currentItem, isAdded: !_currentStatus};
    addCardProducts = _newArr;
    global.addCardProducts = _newArr;
    dispatch(addToCart(addCardProducts));
    dispatch(setProduct(_d));
    showErrorAlert('Item deleted successfully');
  };

  const placeOrder = () => {
    setAddedTocart([]);
    addCardProducts = [];
    global.addCardProducts = [];
    const _d = [...AuthReducer?.addProduct];
    const _a = _d.map(i => {
      return {...i, isAdded: false};
    });
    dispatch(setProduct(_a));
    dispatch(addToCart(addCardProducts));
    showErrorAlert('Order placed successfully');
  };

  const addFunc = _data => {
    let _p = [];
    for (let i = 0; i < _data?.length; i++) {
      _p.push(Number(_data[i]?.price));
    }
    const _totalPrice = _p.reduce((_acc, _cVal) => _acc + _cVal, 0);
    setTotalPrice(_totalPrice);
  };

  useEffect(() => {
    setAddedTocart(AuthReducer?.addtoCartResponse || []);
    addFunc(AuthReducer?.addtoCartResponse || []);
  }, [isFocused, AuthReducer]);

  return (
    <>
      <SafeAreaView style={HomeStyles.container}>
        <MyStatusBar backgroundColor={Colors.bgColor} />
        <View
          style={{
            backgroundColor: Colors.bgColor,
            marginBottom: normalize(20),
          }}>
          <View style={HomeStyles.navBar}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={HomeStyles.backBtn}>
              <Image source={Icons.LeftArrow} style={HomeStyles.back} />
            </TouchableOpacity>
            <View style={HomeStyles.brandContainer}>
              <Text style={HomeStyles.brandTxt1}>ShoeCart</Text>
            </View>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: normalize(30)}}>
          <View style={HomeStyles.cartItemContainer}>
            <Text
              style={{
                fontFamily: Fonts.RobotoMedium,
                fontSize: normalize(13),
                color: Colors.white,
              }}>
              Cart Items
            </Text>
          </View>

          {addedTocart?.length !== 0 ? (
            <SwipeListView
              ref={flatRef}
              pagingEnabled={false}
              legacyImplementation={false}
              onScroll={event => {
                scrollPosition = event?.nativeEvent?.contentOffset?.y ?? 0;
              }}
              closeOnRowOpen={true}
              closeOnScroll={true}
              keyExtractor={(item, index) => new String(item.id).toString()}
              showsVerticalScrollIndicator={false}
              disableRightSwipe
              data={addedTocart ?? []}
              renderItem={({item, index}) => (
                <View style={HomeStyles.listContainer} key={index}>
                  <View style={HomeStyles.listImgContainer}>
                    <Image
                      source={{uri: item.img}}
                      resizeMode="cover"
                      style={HomeStyles.listImg}
                    />
                  </View>
                  <View style={HomeStyles.listTxtContainer}>
                    <Text style={HomeStyles.listTxt}>{item.txt}</Text>
                    <View style={HomeStyles.sizeBrandContainer}>
                      <Text style={HomeStyles.sizeTxt}>Size: {item.size}</Text>
                      <Text style={HomeStyles.brandTxt}>
                        Brand: {item.brand}
                      </Text>
                    </View>
                  </View>
                  <View style={HomeStyles.priceContainer}>
                    <Text style={HomeStyles.priceTxt}>Rs. {item.price}</Text>
                  </View>
                </View>
              )}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-normalize(65)}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              nestedScrollEnabled={true}
              style={{marginBottom: normalize(15)}}
              closeOnRowBeginSwipe={true}
              bounces={false}
            />
          ) : (
            <View
              style={[HomeStyles.noProductContainer, {height: normalize(450)}]}>
              <Text style={HomeStyles.noProductTxt}>Cart Item is Empty</Text>
            </View>
          )}
        </ScrollView>
        {addedTocart?.length !== 0 && (
          <View style={HomeStyles.totalPriceContainer}>
            <View style={HomeStyles.tpCon1}>
              <Text style={HomeStyles.tPTxt}>Rs. {totalPrice}</Text>
            </View>
            <TouchableOpacity
              style={HomeStyles.placeOrderBtnContainer}
              activeOpacity={0.5}
              onPress={() => placeOrder()}>
              <Text style={HomeStyles.placeOrdertxt}>Place Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default AddItemCart;
