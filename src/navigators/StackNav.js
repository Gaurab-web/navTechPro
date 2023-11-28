import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/splashScreen/Splash';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import Home from '../screens/home/Home';
import EditProduct from '../screens/home/EditProduct';
import UserHome from '../screens/home/UserHome';
import AddItemCart from '../screens/home/AddItemCart';

export default function StackNav() {
  const Stack = createStackNavigator();
  const Screens = {
    Splash: Splash,
    WelcomeScreen: WelcomeScreen,
    Home:Home,
    EditProduct:EditProduct,
    UserHome:UserHome,
    AddItemCart:AddItemCart
  };

  return (
    <NavigationContainer
      theme={{
        colors: '#000'
      }}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {Object.entries({
          ...Screens,
        }).map(([name, component]) => {
          return (
            <Stack.Screen
              name={name}
              component={component}
              key={name}
              options={{animation: 'slide_from_right'}}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
