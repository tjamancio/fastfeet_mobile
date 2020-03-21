import 'react-native-gesture-handler';
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import Deliveries from './pages/Deliveries';
import Delivery from './pages/Delivery';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import { navigationRef } from './services/RootNavigation';
import { colors } from './styles';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DeliveryTab = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Deliveries"
      component={Deliveries}
      options={{
        headerShown: false,
        tabBarVisible: false,
      }}
    />
    <Stack.Screen name="Delivery" component={Delivery} />
  </Stack.Navigator>
);

export default function Routes() {
  const signed = useSelector(state => state.auth.signed);
  return (
    <NavigationContainer ref={navigationRef}>
      {!signed ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
          <Tab.Navigator
            tabBarOptions={{
              drawUnderNavBar: false,
              activeTintColor: colors.primary,
              style: {
                alignItems: 'center',
              },
              tabStyle: {
                paddingVertical: 5,
              },
            }}>
            <Stack.Screen
              name="Dashboard"
              component={DeliveryTab}
              options={{
                title: 'Entregas',
                // tabBarVisible: false,
                tabBarIcon: ({ color }) => (
                  <Icon name="menu" color={color} size={20} />
                ),
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                title: 'Meu Perfil',
                tabBarIcon: ({ color }) => (
                  <Icon name="account-circle" color={color} size={20} />
                ),
              }}
            />
          </Tab.Navigator>
        )}
    </NavigationContainer>
  );
}
