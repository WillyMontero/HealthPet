import React from 'react';
import {ArrowUpCircle, Image, Airplay, Award} from 'react-native-feather';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Screens
import HomeView from '../views/home/Home';
import PetsView from '../views/pets/Pets';
import MapsView from '../views/maps/Maps';
import ProfileView from '../views/profile/Profile';

//Screen names
const homeName = 'Home';
const petsName = 'Pets';
const mapsName = 'Maps';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

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
        <Tab.Screen name={petsName} component={PetsView} />
        <Tab.Screen name={mapsName} component={MapsView} />
        <Tab.Screen name={profileName} component={ProfileView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationButton;
