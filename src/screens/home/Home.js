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
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from 'react-redux';
import {setProduct} from '../../redux/Reducer/AuthReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useIsFocused} from '@react-navigation/native';
import connectionrequest from '../../utils/helpers/NetInfo';
import {HomeStyles} from './style';

let productList = [];

const Home = ({navigation, route}) => {
  const btn = [
    {id: 1, name: 'Products'},
    {id: 2, name: 'Add Products'},
  ];
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const isFocused = useIsFocused();
  const flatRef = useRef(null);
  const roundHeight = Platform.OS == 'android' ? normalize(50) : normalize(50);
  const size = [5, 6, 7, 8, 9, 10, 11, 12, 13];
  const brands = ['Khadims', 'Bata', 'Zara', 'Nike'];
  const [select, setSelect] = useState({id: 1, name: 'Products'});
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [sizeModal, setSizeModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [sizeVal, setSizeVal] = useState('');
  const [brandVal, setBrandVal] = useState('');
  const [price, setPrice] = useState('');
  const [modalImagePicker, setModalImagePicker] = useState(false);
  const [selectedPhotoURI, setselectedPhotoURI] = useState(null);
  const [selectedPhoto, setselectedPhoto] = useState(null);

  const toggleSizeModal = () => {
    setSizeModal(!sizeModal);
  };

  const toggleBrandModal = () => {
    setBrandModal(!brandModal);
  };

  const selectProfilePhoto = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      mediaType: 'photo',
      cropperCircleOverlay: false,
      sortOrder: 'none',
      compressImageQuality: Platform.OS === 'android' ? 1 : 0.8,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      multiple: false,
    })
      .then(image => {
        let arr = image.path.split('/');
        let getOriginalname = arr[arr.length - 1];
        let imageObj = {
          name: getOriginalname,
          type: image.mime,
          uri:
            Platform.OS === 'android'
              ? image.path
              : image.path.replace('file://', ''),
        };
        setselectedPhotoURI(imageObj.uri);
        setselectedPhoto(imageObj);
        setModalImagePicker(false);
      })
      .catch(err => {
        console.log(err);
        const _err = new String(err).toString().includes('permission');
        if (_err) {
          Alert.alert(t('permission_denied'), t('permission denied'), [
            {
              text: t('cancel'),
            },
            {
              text: t('settings'),
              onPress: () => {
                Linking.openSettings()
                  .then(() => {})
                  .catch(ex => {});
              },
            },
          ]);
        }
        setModalImagePicker(false);
      });
  };
  function onPressTakephoto() {
    ImagePicker?.openCamera({
      width: normalize(300),
      height: normalize(400),
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        let arr = image.path.split('/');
        let getOriginalname = arr[arr.length - 1];
        let imageObj = {
          name: getOriginalname,
          type: image.mime,
          uri:
            Platform.OS === 'android'
              ? image.path
              : image.path.replace('file://', ''),
        };
        setselectedPhotoURI(imageObj.uri);
        setselectedPhoto(imageObj);
        setModalImagePicker(false);
      })
      .catch(err => {
        console.log(err);
        const _err = new String(err).toString().includes('camera');
        if (_err) {
          Alert.alert(t('permission_denied'), t('permission denied'), [
            {
              text: t('cancel'),
            },
            {
              text: t('settings'),
              onPress: () => {
                Linking.openSettings()
                  .then(() => {})
                  .catch(ex => {});
              },
            },
          ]);
        }
        setModalImagePicker(false);
      });
  }

  const renderHiddenItem = data => {
    return (
      <View
        style={[HomeStyles.hiddenContainer, {backgroundColor: Colors.primary}]}>
        <TouchableOpacity
          style={HomeStyles.hiddenBtnCon}
          onPress={() => {
            navigation.navigate('EditProduct', {data: data?.item});
          }}
          activeOpacity={0.8}>
          <Image
            source={Icons.edit}
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

  const handleAdd = () => {
    if (selectedPhotoURI == '') {
      showErrorAlert('Please add an image');
    } else if (productName == '') {
      showErrorAlert('Please add the product name');
    } else if (sizeVal == '') {
      showErrorAlert('Please select the size');
    } else if (brandVal == '') {
      showErrorAlert('Please select the brand');
    } else if (price == '') {
      showErrorAlert('Please select the price');
    } else {
      connectionrequest()
        .then(() => {
          let obj = {
            id: uuidv4(),
            img: selectedPhotoURI,
            txt: productName,
            size: sizeVal,
            brand: brandVal,
            price: price,
            isAdded: false,
          };

          setProducts([...products, obj]);
          productList = [...productList, obj];
          dispatch(setProduct(productList));
          setselectedPhotoURI(null);
          setProductName('');
          setSizeVal('');
          setBrandVal('');
          setPrice('');

          showErrorAlert('Product added successfully');
        })
        .catch(() => {
          showErrorAlert('Please turn on internet');
        });
    }
  };

  useEffect(() => {
    setProducts(AuthReducer?.addProduct || []);
  }, [isFocused]);

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
          <Text style={HomeStyles.greetTxt}>Hello Admin</Text>
          <View style={HomeStyles.navigationContainer}>
            {btn.map((item, index) => (
              <TouchableOpacity
                style={{
                  width: '48%',
                  height: '100%',
                  backgroundColor:
                    select?.id == item.id ? Colors.primary : null,
                  borderRadius: normalize(40),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: select?.id !== item.id ? 1 : 0,
                  borderColor: select?.id !== item.id ? Colors.primary : null,
                }}
                activeOpacity={0.5}
                key={index}
                onPress={() => setSelect(item)}>
                <Text
                  style={{
                    fontFamily: Fonts.RobotoRegular,
                    fontSize: normalize(9),
                    color: select?.id !== item.id ? Colors.white : Colors.black,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {select.id == 1 ? (
            products?.length !== 0 ? (
              <SwipeListView
                ref={flatRef}
                pagingEnabled={false}
                legacyImplementation={false}
                onScroll={event => {
                  scrollPosition = event?.nativeEvent?.contentOffset?.y ?? 0;
                }}
                closeOnRowOpen={true}
                closeOnScroll={true}
                keyExtractor={(item, index) => new String(item._id).toString()}
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
                        <Text style={HomeStyles.sizeTxt}>
                          Size: {item.size}
                        </Text>
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
              <View style={HomeStyles.noProductContainer}>
                <Text style={HomeStyles.noProductTxt}>
                  No products available
                </Text>
              </View>
            )
          ) : (
            <View>
              <TouchableOpacity
                style={HomeStyles.addImageContainer}
                activeOpacity={0.5}
                onPress={() => setModalImagePicker(!modalImagePicker)}>
                {selectedPhotoURI == null ? (
                  <Image
                    source={Icons.addImage}
                    resizeMode="contain"
                    style={HomeStyles.addImage}
                  />
                ) : (
                  <Image
                    source={{uri: selectedPhotoURI}}
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                )}
              </TouchableOpacity>
              <TextInput
                placeholder="Name of the product"
                placeholderTextColor={Colors.lightGrey}
                value={productName}
                onChangeText={newText => setProductName(newText)}
                style={HomeStyles.productNameBox}
              />
              <View style={HomeStyles.infoContainer}>
                <TouchableOpacity
                  style={{
                    width: '30%',
                    height: '100%',
                    borderWidth: 1,
                    borderColor: Colors.primary,
                    borderRadius: normalize(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: sizeVal == '' ? 'space-evenly' : 'center',
                    paddingHorizontal: normalize(10),
                  }}
                  activeOpacity={0.5}
                  onPress={() => toggleSizeModal()}>
                  {sizeVal == '' ? (
                    <>
                      <Text style={HomeStyles.sizeDropDownText}>Size</Text>
                      <Image
                        source={Icons.downarrow}
                        resizeMode="contain"
                        style={{
                          width: normalize(15),
                          height: normalize(15),
                        }}
                      />
                    </>
                  ) : (
                    <Text style={HomeStyles.sizeDropDownText}>{sizeVal}</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '30%',
                    height: '100%',
                    borderWidth: 1,
                    borderColor: Colors.primary,
                    borderRadius: normalize(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: brandVal == '' ? 'space-evenly' : 'center',
                    paddingHorizontal: normalize(10),
                  }}
                  activeOpacity={0.5}
                  onPress={() => toggleBrandModal()}>
                  {brandVal == '' ? (
                    <>
                      <Text style={HomeStyles.sizeDropDownText}>Brand</Text>
                      <Image
                        source={Icons.downarrow}
                        resizeMode="contain"
                        style={{
                          width: normalize(15),
                          height: normalize(15),
                        }}
                      />
                    </>
                  ) : (
                    <Text style={HomeStyles.sizeDropDownText}>{brandVal}</Text>
                  )}
                </TouchableOpacity>
                <TextInput
                  placeholder="Price"
                  placeholderTextColor={Colors.lightGrey}
                  onChangeText={newText => setPrice(newText)}
                  keyboardType="number-pad"
                  value={price}
                  style={HomeStyles.priceTextBox}
                />
              </View>

              <TouchableOpacity
                style={HomeStyles.addProductBtnContainer}
                activeOpacity={0.5}
                onPress={() => handleAdd()}>
                <Text style={HomeStyles.addProducttxt}>Add Product</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        <Modal
          isVisible={sizeModal}
          style={{
            margin: 0,
          }}
          animationIn={'slideInUp'}
          onBackdropPress={() => toggleSizeModal()}>
          <View style={HomeStyles.sizeModalContainer}>
            <FlatList
              data={size}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={HomeStyles.sizeModalItemContainer}
                  key={index}
                  activeOpacity={0.5}
                  onPress={() => {
                    setSizeVal(String(item));
                    toggleSizeModal();
                  }}>
                  <Text style={HomeStyles.sizeDropDownText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
        <Modal
          isVisible={brandModal}
          style={{
            margin: 0,
          }}
          animationIn={'slideInUp'}
          onBackdropPress={() => toggleBrandModal()}>
          <View style={HomeStyles.sizeModalContainer}>
            <FlatList
              data={brands}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={HomeStyles.sizeModalItemContainer}
                  key={index}
                  activeOpacity={0.5}
                  onPress={() => {
                    setBrandVal(item);
                    toggleBrandModal();
                  }}>
                  <Text style={HomeStyles.sizeDropDownText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
        <Modal
          onBackdropPress={() => setModalImagePicker(false)}
          onRequestClose={() => {
            setModalImagePicker(!modalImagePicker);
          }}
          animationType="slide"
          transparent={true}
          visible={modalImagePicker}>
          <View style={HomeStyles.imagePickerModalContainer}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setModalImagePicker(false);
                  setTimeout(() => {
                    onPressTakephoto();
                  }, 1000);
                }}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={Icons.camera}
                  style={{
                    height: normalize(40),
                    width: normalize(40),
                    tintColor: Colors.primary,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontFamily: Fonts.RobotoBold,
                    fontSize: normalize(10),
                    color: Colors.primary,
                  }}>
                  {'Take Photo'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalImagePicker(false);
                  setTimeout(() => {
                    selectProfilePhoto();
                  }, 1000);
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: normalize(20),
                }}>
                <Image
                  source={Icons.addImage}
                  style={{
                    height: normalize(40),
                    width: normalize(40),
                    tintColor: Colors.primary,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontFamily: Fonts.RobotoBold,
                    fontSize: normalize(10),
                    color: Colors.primary,
                  }}>
                  {'Select Photo'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default Home;
