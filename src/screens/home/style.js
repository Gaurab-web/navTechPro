import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Colors, Fonts} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';

const roundHeight = Platform.OS == 'android' ? normalize(50) : normalize(50);

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  navBar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: Platform.OS == 'ios' ? 0 : normalize(15),
    height: normalize(60),
  },
  back: {
    height: normalize(10),
    width: normalize(10),
    resizeMode: 'contain',
  },
  backBtn: {
    height: normalize(20),
    width: normalize(20),
    borderRadius: normalize(20) + normalize(20) / 4,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS == 'ios' ? normalize(-10) : 0,
  },
  brandContainer: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTxt1: {
    fontFamily: Fonts.RobotoMedium,
    color: Colors.primary,
    fontSize: normalize(15),
    marginRight: normalize(10),
  },
  greetTxt: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: normalize(13),
    color: Colors.white,
    marginLeft: normalize(15),
  },
  navigationContainer: {
    width: '90%',
    height: normalize(30),
    alignSelf: 'center',
    marginTop: normalize(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(20),
  },
  listContainer: {
    width: '90%',
    alignSelf: 'center',
    height: normalize(65),
    marginVertical: normalize(10),
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
  },
  listImgContainer: {
    width: '25%',
    height: '100%',
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden',
    borderRadius: normalize(10),
  },
  listImg: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(10),
    backgroundColor: Colors.bgColor,
  },
  listTxtContainer: {
    width: '57%',
    height: '100%',
    justifyContent: 'center',
  },
  listTxt: {
    fontFamily: Fonts.RobotoRegular,
    color: Colors.white,
    fontSize: normalize(10),
    marginBottom: normalize(8),
  },
  sizeBrandContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sizeTxt: {
    fontFamily: Fonts.RobotoLight,
    color: Colors.lightGrey,
    fontSize: normalize(8),
    marginRight: normalize(15),
  },
  brandTxt: {
    fontFamily: Fonts.RobotoLight,
    color: Colors.lightGrey,
    fontSize: normalize(8),
  },
  priceContainer: {
    width: '18%',
    height: '100%',
    justifyContent: 'center',
  },
  priceTxt: {
    fontFamily: Fonts.RobotoMedium,
    color: Colors.white,
    fontSize: normalize(10),
    marginBottom: normalize(8),
  },
  noProductContainer: {
    width: '90%',
    height: normalize(350),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductTxt: {
    fontFamily: Fonts.RobotoMedium,
    color: Colors.lightGrey,
    fontSize: normalize(15),
  },
  addImageContainer: {
    width: '90%',
    height: normalize(120),
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: normalize(10),
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(20),
  },
  addImage: {
    width: normalize(25),
    height: normalize(25),
    tintColor: Colors.primary,
  },
  productNameBox: {
    width: '90%',
    height: normalize(45),
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: normalize(10),
    alignSelf: 'center',
    marginVertical: normalize(10),
    color: Colors.white,
    fontFamily: Fonts.RobotoRegular,
    fontSize: normalize(10),
    paddingHorizontal: normalize(20),
  },
  infoContainer: {
    width: '90%',
    height: normalize(45),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  sizeDropDownText: {
    fontFamily: Fonts.RobotoRegular,
    color: Colors.white,
    fontSize: normalize(10),
  },
  priceTextBox: {
    width: '30%',
    height: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: normalize(10),
    color: Colors.white,
    fontFamily: Fonts.RobotoRegular,
    fontSize: normalize(10),
    paddingHorizontal: normalize(20),
  },
  addProductBtnContainer: {
    width: '90%',
    height: normalize(40),
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(30),
    borderRadius: normalize(10),
  },
  addProducttxt: {
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    fontSize: normalize(12),
  },
  sizeModalContainer: {
    width: '100%',
    height: '40%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.background,
    paddingTop: normalize(10),
  },
  sizeModalItemContainer: {
    width: '90%',
    height: normalize(45),
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: normalize(10),
    alignSelf: 'center',
    marginVertical: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerModalContainer: {
    height: normalize(200),
    width: normalize(250),
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: normalize(10),
  },
  heloUserContainer: {
    width: '90%',
    height: normalize(35),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  helouserTxt: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: normalize(13),
    color: Colors.white,
  },
  userCartConatiner: {
    width: normalize(100),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: normalize(15),
  },
  cartItemContainer: {
    width: '90%',
    height: normalize(35),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalPriceContainer: {
    width: '100%',
    height: normalize(55),
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tpCon1: {
    width: '50%',
    height: '100%',
    paddingLeft: normalize(10),
    justifyContent: 'center',
  },
  tPTxt: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: normalize(15),
    color: Colors.primary,
  },
  placeOrderBtnContainer: {
    width: '40%',
    height: '70%',
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(10),
    marginHorizontal: normalize(10),
  },
  placeOrdertxt: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: normalize(13),
    color: Colors.black,
  },
  hiddenContainer:{
    alignItems: 'center',
    backgroundColor: 'red',
    width: '90%',
    height: normalize(45),
    alignSelf: 'center',
    flexDirection: 'row',
    minHeight: normalize(roundHeight),
    maxHeight: normalize(roundHeight),
    marginTop: normalize(10),
    borderRadius: normalize(10),
  },
  hiddenBtnCon:{
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: -2,
    right: 0,
    width: normalize(58),
  }
});
