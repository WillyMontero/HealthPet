import * as React from 'react';
import {View, Text} from 'react-native';

const Pets = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'red',
      }}>
      <Text style={{fontSize: 26, fontWeight: 'bold'}}>Pets Screen</Text>
    </View>
  );
};

export default Pets;
