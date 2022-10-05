import React from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import StylesLogin from './StylesLogin';

const Login = () => {
  return (
    <View style={StylesLogin.sectionContainer}>
      <View style={StylesLogin.titleContainer}>
        <Text style={[StylesLogin.title, StylesLogin.btnText]}>Health Pet</Text>
      </View>
      <View style={StylesLogin.inputContainer}>
        <View style={StylesLogin.inputField}>
          <Text style={StylesLogin.titleInput}>Correo electronico</Text>
          <TextInput
            style={StylesLogin.input}
            placeholder="Correo electronico"
          />
        </View>
        <View style={StylesLogin.inputField}>
          <Text style={StylesLogin.titleInput}>Contraseña</Text>
          <TextInput
            style={StylesLogin.input}
            placeholder="Contraseña"
            secureTextEntry
          />
        </View>
        <View style={StylesLogin.btnConteiner}>
          <TouchableOpacity
            style={StylesLogin.btn}
            onPress={() => console.log('login')}>
            <Text style={StylesLogin.btnText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
        <View style={StylesLogin.inputContainer}>
          <TouchableOpacity
            onPress={() => console.log('login')}>
            <Text style={StylesLogin.btnLink}>¿No tienes cuenta?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('login')}>
            <Text style={StylesLogin.btnLink}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
