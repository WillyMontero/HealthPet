import React from 'react';
import {ArrowUpCircle, Image, Airplay, Award} from 'react-native-feather';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Screens
import HomeView from '../views/home/Home';
import PetsView from '../views/pets/Pets';
import MapsView from '../views/maps/Maps';
import ProfileView from '../views/profile/Profile';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View} from 'react-native';

//Screen names
const homeName = 'Home';
const petsName = 'Pets';
const mapsName = 'Maps';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

function DetailsScreen() {
  return (
    // eslint-disable-next-line prettier/prettier
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

const SettingsStack = createStackNavigator();
function PetsViews() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsStack.Screen name="pets" component={PetsView} />
      <SettingsStack.Screen name="petsAdd" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const NavigationButton = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          tabBarIcon: () => {
            let rn = route.name;

            if (rn === homeName) {
              return <Image stroke="red" fill="white" />;
            } else if (rn === petsName) {
              return <ArrowUpCircle stroke="red" fill="white" />;
            } else if (rn === mapsName) {
              return <Airplay stroke="red" fill="white" />;
            } else if (rn === profileName) {
              return <Award stroke="red" fill="white" />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: {paddingBottom: 10, fontSize: 10},
          style: {padding: 10, height: 70},
        }}>
        <Tab.Screen name={homeName} component={HomeView} />
        <Tab.Screen name={petsName} component={PetsViews} />
        <Tab.Screen name={mapsName} component={MapsView} />
        <Tab.Screen name={profileName} component={ProfileView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationButton;
