import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../themes/ImagePath';
import MyStatusBar from '../../utils/MyStatusBar';
import {AuthStyles} from './style';

const WelcomeScreen = props => {
  const handleAdmin = () => {
    props.navigation.navigate('Home');
  };

  const handleUser = () => {
    props.navigation.navigate('UserHome');
  };
  return (
    <View style={AuthStyles.container}>
      <MyStatusBar backgroundColor={Colors.bgColor} />
      <Text style={AuthStyles.textStyle1}>I am as</Text>
      <TouchableOpacity
        style={AuthStyles.btnStyle}
        activeOpacity={0.5}
        onPress={() => handleAdmin()}>
        <Text style={AuthStyles.btnTxtStyle}>Admin</Text>
      </TouchableOpacity>
      <View style={AuthStyles.orcontainer}>
        <View style={AuthStyles.line}></View>
        <View style={AuthStyles.ortextcontainer}>
          <Text style={AuthStyles.ortxt}>OR</Text>
        </View>
      </View>
      <TouchableOpacity
        style={AuthStyles.btnStyle}
        activeOpacity={0.5}
        onPress={() => handleUser()}>
        <Text style={AuthStyles.btnTxtStyle}>User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
