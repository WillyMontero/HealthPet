import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import {User as userFirebase} from '../../firebase';
import {UserContext} from '../../context/UserContext';

const Album = () => {
  const [photoURL, setPhotoURL] = useState<any>();
  const {getAlbum} = userFirebase();
  const {user} = useContext(UserContext);

  const loadPets = React.useCallback(async () => {
    await getAlbum(user.id).then(res => {
      if (res) setPhotoURL(res.data().album);
    });
  }, [getAlbum]);

  useEffect(() => {
    loadPets();
  }, []);

  return (
    <View style={styles.background}>
      <GridImageView heightOfGridImage={200} data={photoURL} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1,
    paddingTop: 45,
  },
  headline_text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 20,
  },
  explore_text: {
    marginTop: 5,
    marginBottom: 10,
    color: 'white',
    marginLeft: 20,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Album;
