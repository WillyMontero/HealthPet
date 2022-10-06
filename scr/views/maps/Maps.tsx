import * as React from 'react';
import {PermissionsAndroid, SafeAreaView, StyleSheet, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const Maps = () => {
  const [access, setAccess] = React.useState(false);
  const [currentLongitude, setCurrentLongitude] = React.useState(0);
  const [currentLatitude, setCurrentLatitude] = React.useState(0);

  React.useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('con permisos...');
          setAccess(true);
          Geolocation.getCurrentPosition(
            //Will give you the current location
            position => {
              //getting the Longitude from the location json
              const clg = position.coords.longitude;
              setCurrentLongitude(clg);
              //getting the Latitude from the location json
              const clt = position.coords.latitude;
              setCurrentLatitude(clt);
              console.log(clg, clt, position);
            },
            error => console.log(error),
            {
              timeout: 20000,
            },
          );
        } else {
          console.log('sin permisos...');
          setAccess(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    requestLocationPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {access ? (
        <MapView style={styles.map}>
          <Marker
            coordinate={{
              latitude: currentLatitude,
              longitude: currentLongitude,
            }}
          />
        </MapView>
      ) : (
        <Text style={{fontSize: 26, fontWeight: 'bold'}}>Pets Screen</Text>
      )}
    </SafeAreaView>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
