import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const FireBaseTest = () => {
  async function loadData() {
    try {
      await firestore()
        .collection('Mascotas')
        .get()
        .then(collectionSnapshot => {
          console.log('Total: ', collectionSnapshot.size);
          collectionSnapshot.forEach(documentSnapshot => {
            console.log('data: ', documentSnapshot.data());
          });
        });
    } catch (error) {
      console.log('error3: ', error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      <Text>{'hola'}</Text>
    </View>
  );
};

export default FireBaseTest;
