import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import StylesLogin from './StylesLogin';

const Login = () => {
  return (
    <SafeAreaView style={StylesLogin.sectionContainer}>
      <Text>Health Pet</Text>
      <View style={StylesLogin.btn}>
        <Button
          title="Iniciar Sesión"
          color={'#095256'}
          onPress={() => console.log('text login')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
