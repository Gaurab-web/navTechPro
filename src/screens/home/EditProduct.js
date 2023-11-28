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
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyStatusBar from '../../utils/MyStatusBar';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import showErrorAlert from '../../utils/helpers/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {setProduct} from '../../redux/Reducer/AuthReducer';
import {HomeStyles} from './style';

const EditProduct = ({navigation, route}) => {
  const {data} = route?.params;
  const AuthReducer = useSelector(state => state.AuthReducer);
  console.log('Auth', AuthReducer);
  const dispatch = useDispatch();
  const size = [5, 6, 7, 8, 9, 10, 11, 12, 13];
  const brands = ['Khadims', 'Bata', 'Zara', 'Nike'];
  const [productName, setProductName] = useState(data?.txt);
  const [sizeModal, setSizeModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [sizeVal, setSizeVal] = useState(data?.size);
  const [brandVal, setBrandVal] = useState(data?.brand);
  const [price, setPrice] = useState(data?.price);
  const [modalImagePicker, setModalImagePicker] = useState(false);
  const [selectedPhotoURI, setselectedPhotoURI] = useState(data?.img);
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

  const handleSave = () => {
    const _newArr = [...AuthReducer?.addProduct];
    const _in = _newArr.findIndex(i => i.id == data?.id);
    let obj = {
      id: data?.id,
      img: selectedPhotoURI,
      txt: productName,
      size: sizeVal,
      brand: brandVal,
      price: price,
      isAdded: false,
    };
    _newArr.splice(_in, 1, obj);
    dispatch(setProduct(_newArr));
    showErrorAlert('Product updated successfully');
    navigation.navigate('Home');
  };
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
          <Text style={[HomeStyles.greetTxt, {marginBottom: normalize(20)}]}>
            Edit product
          </Text>

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
              onPress={() => handleSave()}>
              <Text style={HomeStyles.addProducttxt}>Save Product</Text>
            </TouchableOpacity>
          </View>
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

export default EditProduct;
