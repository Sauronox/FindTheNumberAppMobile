import React from 'react';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Game from '../Components/Game'
import About from '../Components/About'
import Log from '../Components/LogGame'
const SearchStackNavigator = createStackNavigator({
  Game: { 
    screen: Game,
    navigationOptions: {
      title: 'Game'
    }
  },
  About:{
      screen: About,
      navigationOptions: {
        title: 'About'
      }
  }
})
const TabNavigator = createBottomTabNavigator(
    {
      Game: SearchStackNavigator,
      History: Log,
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Game') {
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          } else if (routeName === 'History') {
            iconName = `ios-options${focused ? '' : '-outline'}`;
          }
  
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
);

export default TabNavigator