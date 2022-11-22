import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { User as userFirebase } from '../../firebase';
import { useNavigate } from 'react-router-native';
import { ArrowLeft } from 'react-native-feather';
import StylesRegister from './stylesRegister';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, surname, email, confirmPassword, password } = values;

  const { addNewUser } = userFirebase();
  const navigate = useNavigate();

  const onChange = (value: string, name: string) =>
    setValues(prev => ({ ...prev, [name]: value }));

  const handleRegister = async () => {
    const empty = isEmpty();
    if (empty.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Registro',
        text2: 'Faltan espacios por llenar. 😞',
      });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Registro',
        text2: 'La contraseñas no coinciden. 😞',
      });
      return;
    }
    const newUser = await addNewUser({ name, surname, email, password });
    if (newUser) {
      Toast.show({
        type: 'success',
        text1: 'Registro',
        text2: 'Usuario registrado correctamente. ',
      });
      cleanFields();
      navigate('/');
    }
  };

  const isEmpty = () => {
    const empty = [];
    if (name.trim() === '') {
      empty.push('Nombre');
    }
    if (surname.trim() === '') {
      empty.push('Apellidos');
    }
    if (email.trim() === '') {
      empty.push('Correo electronico');
    }
    if (password.trim() === '') {
      empty.push('Contraseña');
    }
    if (confirmPassword.trim() === '') {
      empty.push('Confirmar contraseña');
    }
    return empty;
  };

  const cleanFields = () => {
    setValues({
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Fb3.jpeg?alt=media&token=45504ef9-29c1-4939-a773-a564aac22742',
      }}
      style={{ width: '100%', height: '100%' }}>
      <View style={StylesRegister.iconBackContainer}>
        <TouchableOpacity
          style={StylesRegister.iconBack}
          onPress={() => {
            cleanFields();
            navigate('/');
          }}>
          <ArrowLeft height={40} width={40} stroke="black" fill="transparent" />
        </TouchableOpacity>
        <View style={StylesRegister.sectionContainer}>
          <View style={StylesRegister.containerInput}>
            <View style={StylesRegister.inputField}>
              <Text style={StylesRegister.titleInput}>Nombre:</Text>
              <TextInput
                style={StylesRegister.input}
                placeholder="Nombre"
                value={name}
                onChangeText={text => onChange(text, 'name')}
              />
            </View>

            <View style={StylesRegister.inputField}>
              <Text style={StylesRegister.titleInput}>Apellidos:</Text>
              <TextInput
                style={StylesRegister.input}
                placeholder="Apellidos"
                value={surname}
                onChangeText={text => onChange(text, 'surname')}
              />
            </View>

            <View style={StylesRegister.inputField}>
              <Text style={StylesRegister.titleInput}>Correo electronico:</Text>
              <TextInput
                style={StylesRegister.input}
                placeholder="Correo electronico"
                value={email}
                onChangeText={text => onChange(text, 'email')}
              />
            </View>

            <View style={StylesRegister.inputField}>
              <Text style={StylesRegister.titleInput}>Contraseña:</Text>
              <TextInput
                style={StylesRegister.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={text => onChange(text, 'password')}
                secureTextEntry
              />
            </View>

            <View style={StylesRegister.inputField}>
              <Text style={StylesRegister.titleInput}>Confirmar contraseña:</Text>
              <TextInput
                style={StylesRegister.input}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={text => onChange(text, 'confirmPassword')}
                secureTextEntry
              />
            </View>
          </View>
          <View
            style={[StylesRegister.containerInput, StylesRegister.containerBtn]}>
            <TouchableOpacity
              style={StylesRegister.btn}
              onPress={() => handleRegister()}>
              <Text style={StylesRegister.btnText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Register;
