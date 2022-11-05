import * as React from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';
import {Vet} from '../../firebase';

const Maps = () => {
  const [access, setAccess] = React.useState(false);
  /*const [currentLongitude, setCurrentLongitude] = React.useState(0);
  const [currentLatitude, setCurrentLatitude] = React.useState(0);*/
  const [vets, setVets] = React.useState<any>([]);

  const {getAllVets} = Vet();

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        /*{
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },*/
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('con permisos...');
        setAccess(true);
        const vetsRes = await getAllVets();
        setVets(vetsRes);
        /*Geolocation.getCurrentPosition(
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
        );*/
      } else {
        // console.log('sin permisos...');
        setAccess(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {access && vets.length > 0 ? (
        <MapView style={styles.map} showsUserLocation>
          {vets?.map((vet, index) => (
            <Marker
              key={`marker-${index}`}
              title={vet.name}
              description={`Teléfono: ${vet.phone}`}
              pinColor={'green'}
              coordinate={{
                latitude: vet.lat,
                longitude: vet.lon,
              }}
            />
          ))}
        </MapView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Para acceder a esta vista necesitas conceder permisos de ubicación.
          </Text>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: '#D9D9D9',
              borderRadius: 4,
              justifyContent: 'center',
              height: 50,
              width: 250,
              marginTop: 10,
            }}
            onPress={() => requestLocationPermission()}>
            <Text>Solicitar permisos</Text>
          </TouchableOpacity>
        </View>
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
