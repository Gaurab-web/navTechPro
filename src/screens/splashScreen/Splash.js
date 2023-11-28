import React, {Fragment, useEffect} from 'react';
import {View, Animated, Easing, Text} from 'react-native';
import MyStatusBar from '../../utils/MyStatusBar';
import {Icons, Colors} from '../../themes/ImagePath';
import {SplashStyles} from './style';

export default function Splash(props) {
  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('WelcomeScreen');
    }, 1500);
  }, []);

  return (
    <Fragment>
      <View style={SplashStyles.container}>
        <MyStatusBar backgroundColor={Colors.bgColor} />
        <Animated.Image
          style={[
            SplashStyles.animationContainer,
            {transform: [{rotate: spin}]},
          ]}
          source={Icons.spin}
        />
        <Text
          style={SplashStyles.textStyle}>
          ShoeCart
        </Text>
      </View>
    </Fragment>
  );
}
