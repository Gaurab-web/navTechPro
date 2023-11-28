import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Platform,
  TextInput,
  Alert,
  Linking,
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

global.addCardProducts = [];

const UserHome = ({navigation, route}) => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const isFocused = useIsFocused();
  const flatRef = useRef(null);
  const roundHeight = Platform.OS == 'android' ? normalize(50) : normalize(50);
  const [products, setProducts] = useState([]);
  const [addedTocart, setAddedTocart] = useState([]);

  const renderHiddenItem = data => {
    if (data?.item?.isAdded) {
      return (
        <View style={[HomeStyles.hiddenContainer,{backgroundColor:Colors.primary}]}>
          <View style={HomeStyles.hiddenBtnCon}>
            <Image
              source={Icons.tick}
              resizeMode={'contain'}
              style={{
                height: normalize(15),
                width: normalize(15),
                tintColor: Colors.black,
              }}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={[HomeStyles.hiddenContainer,{backgroundColor:Colors.primary}]}>
          <TouchableOpacity
            style={HomeStyles.hiddenBtnCon}
            onPress={() => {
              handleCart(data?.index, data?.item);
            }}
            activeOpacity={0.8}>
            <Image
              source={Icons.Plus}
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
    }
  };

  const handleCart = (_in, _item) => {
    global.addCardProducts = [...global.addCardProducts, _item];
    const _index = global.addCardProducts?.findIndex(i => i.id == _item.id);
    const currentItem = global.addCardProducts[_index];
    const _currentStatus = currentItem?.isAdded ?? false;
    global.addCardProducts[_index] = {...currentItem, isAdded: !_currentStatus};

    const _d = [...AuthReducer?.addProduct];
    _d.splice(_in, 1, global.addCardProducts[_index]);
    dispatch(setProduct(_d));
    dispatch(addToCart(global.addCardProducts));
    showErrorAlert('Added to cart successfully');
  };

  useEffect(() => {
    setProducts(AuthReducer?.addProduct || []);
    setAddedTocart(AuthReducer?.addtoCartResponse || []);
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
          <View style={HomeStyles.heloUserContainer}>
            <Text style={HomeStyles.helouserTxt}>Hello User</Text>
            <TouchableOpacity
              style={HomeStyles.userCartConatiner}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('AddItemCart')}>
              <Text
                style={{
                  fontFamily: Fonts.RobotoRegular,
                  color: Colors.primary,
                  fontSize: normalize(11),
                }}>
                Cart {addedTocart?.length}
              </Text>
            </TouchableOpacity>
          </View>

          {products?.length !== 0 ? (
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
              data={products ?? []}
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
              <Text style={HomeStyles.noProductTxt}>No products available</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default UserHome;
