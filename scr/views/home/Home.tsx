import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import StylesLogin from '../login/StylesLogin';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const Home = () => {
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
    'http://placeimg.com/500/800/3',
  );

  const loadPhoto = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    setPhotoURL(result.assets[0].uri);
    uploadImage(result.assets[0]);
  };

  const takePhoto = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    setPhotoURL(result.assets[0].uri);
    uploadImage(result.assets[0]);
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

  return (
    <>
      <View style={styles.container}>
        <Slideshow
          height={500}
          dataSource={[
            {url: 'http://placeimg.com/500/800/dog'},
            {url: 'http://placeimg.com/500/800/cat'},
            {url: 'http://placeimg.com/500/800/rabbit'},
            {url: 'http://placeimg.com/500/800/1'},
            {url: 'http://placeimg.com/500/800/2'},
            {url: photoURL},
          ]}
          containerStyle={{width: 300}}
        />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: '#095256',
            borderRadius: 4,
            justifyContent: 'center',
            height: 50,
            width: 250,
          }}
          onPress={() => loadPhoto()}>
          <Text style={StylesLogin.btnText}>Cargar imagen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: '#095256',
            borderRadius: 4,
            justifyContent: 'center',
            height: 50,
            width: 250,
          }}
          onPress={() => takePhoto()}>
          <Text style={StylesLogin.btnText}>Tomar foto</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#f444',
  },
});

export default Home;
