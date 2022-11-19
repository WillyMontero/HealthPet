import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPaw} from '@fortawesome/free-solid-svg-icons/faPaw';
import {faMapLocationDot} from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import {faImages} from '@fortawesome/free-solid-svg-icons/faImages';
import {faUserPen} from '@fortawesome/free-solid-svg-icons/faUserPen';
// Screens
import HomeView from '../views/home/Home';
import AlbumView from '../views/home/Album';
import PetsView from '../views/pets/Pets';
import MapsView from '../views/maps/Maps';
import ProfileView from '../views/profile/Profile';
import {createStackNavigator} from '@react-navigation/stack';
import NewPet from '../views/pets/components/NewPet';

//Screen names
const homeName = 'Home';
const petsName = 'Pets';
const mapsName = 'Maps';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

const SettingsStack = createStackNavigator();
function PetsViews() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsStack.Screen name="pets" component={PetsView} />
      <SettingsStack.Screen name="petsAdd" component={NewPet} />
    </SettingsStack.Navigator>
  );
}

function HomeViews() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsStack.Screen name="home" component={HomeView} />
      <SettingsStack.Screen name="homeAlbum" component={AlbumView} />
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
              return <FontAwesomeIcon icon={faImages} size={25} />;
            } else if (rn === petsName) {
              return <FontAwesomeIcon icon={faPaw} size={25} />; // color="white"
            } else if (rn === mapsName) {
              return <FontAwesomeIcon icon={faMapLocationDot} size={25} />;
            } else if (rn === profileName) {
              return <FontAwesomeIcon icon={faUserPen} size={25} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'grey',
          inactiveBackgroundColor: '#D9D9D9',
          activeBackgroundColor: 'gray',
          labelStyle: {paddingBottom: 10, fontSize: 13},
          style: {height: 70},
        }}>
        <Tab.Screen name={homeName} component={HomeViews} />
        <Tab.Screen name={petsName} component={PetsViews} />
        <Tab.Screen name={mapsName} component={MapsView} />
        <Tab.Screen name={profileName} component={ProfileView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationButton;
