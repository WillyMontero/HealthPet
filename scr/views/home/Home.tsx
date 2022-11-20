import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import StylesLogin from '../login/StylesLogin';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {ArrowLeft, ArrowRight, Camera, Image} from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';
import {Menu, MenuItem} from 'react-native-material-menu';

const Home = () => {
  const navigation = useNavigation();
  /*const [index, setIndex] = useState(0);
  const increment = useRef(1);
  useEffect(() => {
    let interval = setInterval(() => {
      if (index >= 6 - 1) {
        increment.current = -1;
      } else if (index <= 0) {
        increment.current = 1;
      }

      setIndex(index + increment.current);
    }, 3000);
    return () => clearInterval(interval);
  }, [index]);*/
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState<any>(
    'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Fm6.jpg?alt=media&token=689ca3f3-12b0-4939-8281-11de3f26312e',
  );

  const loadPhoto = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});
      setPhotoURL(result.assets[0].uri);
      uploadImage(result.assets[0]);
      hideMenu();
    } catch (error) {
      console.log(error);
    }
  };

  const takePhoto = async () => {
    try {
      const result = await launchCamera({mediaType: 'photo'});
      setPhotoURL(result.assets[0].uri);
      uploadImage(result.assets[0]);
      hideMenu();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (result: any) => {
    try {
      const newRef = storage().ref('images/').child(result.fileName);
      await newRef.putFile(result.uri);
      let urlImagen = await newRef.getDownloadURL();
      console.log('la url de la imagen es: ' + urlImagen);
    } catch (error) {
      console.log(error);
    }
  };

  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  return (
    <ImageBackground
      source={{
        uri: 'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Fbg1.jpg?alt=media&token=54f4c1ef-3aeb-45c3-878a-63357bd17fbb',
      }}
      style={{width: '100%', height: '100%'}}>
      <View style={styles.backGroundImage}>
        <ImageBackground
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Fm2.jpg?alt=media&token=9e0106f5-c534-44e2-b7d5-1987f39801af',
          }}
          style={{
            width: 300,
            height: 450,
          }}></ImageBackground>
      </View>
      <View style={styles.container}>
        <Slideshow
          height={450}
          dataSource={[
            {
              url: 'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Fm1.jpg?alt=media&token=21b78ea6-4741-4b16-af6f-6e640640833d',
            },
            {
              url: 'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Fm2.jpg?alt=media&token=9e0106f5-c534-44e2-b7d5-1987f39801af',
            },
            {
              url: 'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Fm3.jpg?alt=media&token=0bb2fb94-2c04-4c2f-b44c-a7293e88e8cd',
            },
            {
              url: 'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Fm4.jpg?alt=media&token=8a32835f-4b25-4144-aeae-461d3f03372a',
            },
            {
              url: 'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Fm7.jpg?alt=media&token=bee40675-5604-4535-a365-b42aac87bbd7',
            },
            {url: photoURL},
          ]}
          containerStyle={{width: 300, borderColor: 'black', borderWidth: 2}}
          arrowSize={0}
          arrowLeft={
            <ArrowLeft
              stroke="white"
              width={50}
              height={50}
              style={{
                marginLeft: -35,
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderRadius: 100,
              }}
            />
          }
          arrowRight={
            <ArrowRight
              stroke="white"
              width={50}
              height={50}
              style={{
                marginRight: -35,
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderRadius: 100,
              }}
            />
          }
        />
        <Menu
          visible={visible}
          anchor={
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#D9D9D9',
                borderRadius: 4,
                justifyContent: 'space-evenly',
                height: 50,
                width: 250,
                marginTop: 20,
              }}
              onPress={() => showMenu()}>
              <Camera stroke="black" />
              <Text style={StylesLogin.btnText}>Agregar imagen al álbum</Text>
            </TouchableOpacity>
          }
          onRequestClose={hideMenu}>
          <MenuItem onPress={() => takePhoto()}>Tomar Foto</MenuItem>
          <MenuItem onPress={() => loadPhoto()}>
            Seleccionar desde galería
          </MenuItem>
        </Menu>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#D9D9D9',
            borderRadius: 4,
            justifyContent: 'center',
            height: 50,
            width: 250,
          }}
          onPress={() =>
            navigation.navigate('homeAlbum', {screen: 'DetailsScreen2'})
          }>
          <Image style={{marginRight: 15}} stroke="black" />
          <Text style={StylesLogin.btnText}>Ver Álbum</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: '#095256',
  },
  backGroundImage: {
    zIndex: 0,
    elevation: 0,
    position: 'absolute',
    marginLeft: '12%',
    marginTop: '12%',
    borderColor: 'black',
    borderWidth: 2,
  },
});

export default Home;
