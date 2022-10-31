import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import Toast from 'react-native-toast-message';
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

  const onChange = (value: string, name: string) =>
    setValues(prev => ({...prev, [name]: value}));

  const login = async () => {
    const response = await checkUserData(user, password);
    if (response) {
      setIsLogged(true);
      navigate('/home');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login',
        text2: 'El usuario o la contraseña no coinciden. 😞',
      });
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
            onChangeText={text => onChange(text, 'user')}
          />
        </View>
        <View style={StylesLogin.inputField}>
          <Text style={StylesLogin.titleInput}>Contraseña</Text>
          <TextInput
            style={StylesLogin.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={text => onChange(text, 'password')}
            secureTextEntry
          />
        </View>
        <View style={StylesLogin.btnConteiner}>
          <TouchableOpacity style={StylesLogin.btn} onPress={() => login()}>
            <Text style={StylesLogin.btnText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
        <View style={StylesLogin.inputContainer}>
          <TouchableOpacity onPress={() => navigate('/register')}>
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
