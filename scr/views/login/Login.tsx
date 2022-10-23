import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {UserContext} from '../../context/UserContext';
import {User as userFirebase} from '../../firebase';
import {useNavigate} from 'react-router-native';
import StylesLogin from './StylesLogin';

const Login = () => {
  const {setIsLogged} = useContext(UserContext);
  const [values, setValues] = useState({user: '', password: ''});
  const {user, password} = values;
  const {checkUserData} = userFirebase();
  const navigate = useNavigate();

  const onChangeUser = (value: string) => {
    setValues(prev => ({...prev, user: value}));
  };

  const onChangePassword = (value: string) => {
    setValues(prev => ({...prev, password: value}));
  };

  const login = async () => {
    const response = await checkUserData(user, password);
    if (response) {
      setIsLogged(true);
      navigate('/home');
    } else {
      console.log('No user');
    }
  };

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
            value={user}
            onChangeText={text => onChangeUser(text)}
          />
        </View>
        <View style={StylesLogin.inputField}>
          <Text style={StylesLogin.titleInput}>Contraseña</Text>
          <TextInput
            style={StylesLogin.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={text => onChangePassword(text)}
            secureTextEntry
          />
        </View>
        <View style={StylesLogin.btnConteiner}>
          <TouchableOpacity style={StylesLogin.btn} onPress={() => login()}>
            <Text style={StylesLogin.btnText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
        <View style={StylesLogin.inputContainer}>
          <TouchableOpacity onPress={() => navigate('/Register')}>
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
