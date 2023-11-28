import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';

export const AuthStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle1: {
    color: Colors.white,
    fontFamily: Fonts.RobotoMedium,
    fontSize: normalize(14),
  },
  btnStyle: {
    backgroundColor: Colors.primary,
    width: normalize(120),
    height: normalize(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(10),
    marginVertical: normalize(10),
    borderWidth: 1,
    borderColor: Colors.white,
  },
  btnTxtStyle: {
    color: Colors.black2,
    fontFamily: Fonts.RobotoMedium,
    fontSize: normalize(12),
  },
  orcontainer: {
    width: '50%',
    height: normalize(25),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  line: {
    width: '100%',
    height: normalize(1),
    backgroundColor: Colors.white,
  },
  ortextcontainer: {
    backgroundColor: Colors.bgColor,
    width: normalize(50),
    height: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 3,
  },
  ortxt: {
    color: Colors.white,
    fontFamily: Fonts.RobotoRegular,
    fontSize: normalize(11),
  },
});
