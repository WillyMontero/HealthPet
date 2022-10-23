import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {User as userFirebase} from '../../firebase';
import {useNavigate} from 'react-router-native';
import StylesRegister from './stylesRegister';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const {name, surname, email, confirmPassword, password} = values;

  const {addNewUser} = userFirebase();
  const navigate = useNavigate();

  const onChangeName = (value: string) => {
    setValues(prev => ({...prev, name: value}));
  };
  const onChangeSurname = (value: string) => {
    setValues(prev => ({...prev, surname: value}));
  };
  const onChangeEmail = (value: string) => {
    setValues(prev => ({...prev, email: value}));
  };
  const onChangePassword = (value: string) => {
    setValues(prev => ({...prev, password: value}));
  };
  const onChangeConfirmPassword = (value: string) => {
    setValues(prev => ({...prev, confirmPassword: value}));
  };

  const handleRegister = async () => {
    const empty = isEmpty();
    if (empty.length > 0) {
      console.log('Faltan espacios por llenar.');
      return;
    }
    if (password !== confirmPassword) {
      console.log('La contraseña no coinciden.');
      return;
    }
    const newUser = await addNewUser({name, surname, email, password});
    console.log(newUser);
    if (newUser) {
      navigate('/');
      cleanFields();
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
    <View style={StylesRegister.sectionContainer}>
      <View style={StylesRegister.containerInput}>
        <View style={StylesRegister.inputField}>
          <Text style={StylesRegister.titleInput}>Nombre:</Text>
          <TextInput
            style={StylesRegister.input}
            placeholder="Nombre"
            value={name}
            onChangeText={text => onChangeName(text)}
          />
        </View>

        <View style={StylesRegister.inputField}>
          <Text style={StylesRegister.titleInput}>Apellidos:</Text>
          <TextInput
            style={StylesRegister.input}
            placeholder="Apellidos"
            value={surname}
            onChangeText={text => onChangeSurname(text)}
          />
        </View>

        <View style={StylesRegister.inputField}>
          <Text style={StylesRegister.titleInput}>Correo electronico:</Text>
          <TextInput
            style={StylesRegister.input}
            placeholder="Correo electronico"
            value={email}
            onChangeText={text => onChangeEmail(text)}
          />
        </View>

        <View style={StylesRegister.inputField}>
          <Text style={StylesRegister.titleInput}>Contraseña:</Text>
          <TextInput
            style={StylesRegister.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={text => onChangePassword(text)}
            secureTextEntry
          />
        </View>

        <View style={StylesRegister.inputField}>
          <Text style={StylesRegister.titleInput}>Confirmar contraseña:</Text>
          <TextInput
            style={StylesRegister.input}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={text => onChangeConfirmPassword(text)}
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
  );
};

export default Register;
