import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';

const Album = () => {
  return (
    <View style={styles.background}>
      <GridImageView
        heightOfGridImage={200}
        data={[
          'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Fm6.jpg?alt=media&token=689ca3f3-12b0-4939-8281-11de3f26312e',
          'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Fm1.jpg?alt=media&token=21b78ea6-4741-4b16-af6f-6e640640833d',
          'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Fm2.jpg?alt=media&token=9e0106f5-c534-44e2-b7d5-1987f39801af',
          'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Fm3.jpg?alt=media&token=0bb2fb94-2c04-4c2f-b44c-a7293e88e8cd',
          'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Fm4.jpg?alt=media&token=8a32835f-4b25-4144-aeae-461d3f03372a',
        ]}
      />
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
