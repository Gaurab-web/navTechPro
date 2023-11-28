import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen'

export const SplashStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  animationContainer: {
    width: normalize(280),
    height: normalize(280),
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  textStyle: {
    position: 'absolute',
    fontFamily: Fonts.RobotoMedium,
    color:Colors.primary,
    fontSize:normalize(25)
  }
});
