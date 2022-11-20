import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { User as userFirebase } from '../../firebase';
import { useNavigate } from 'react-router-native';
import { ArrowLeft } from 'react-native-feather';
import StylesRegister from '../register/stylesRegister';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';

const Profile = () => {
  /*const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  const {name, surname, email, currentPassword, newPassword} = values;

  const {editUser} = userFirebase();
  const navigate = useNavigate();

  const onChange = (value: string, name: string) =>
    setValues(prev => ({...prev, [name]: value}));

  const handleSave = async () => {
    const empty = isEmpty();
    if (empty.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Registro',
        text2: 'Faltan espacios por llenar. 😞',
      });
      return;
    }
    if (password !== currentPassword) {
      Toast.show({
        type: 'error',
        text1: 'Registro',
        text2: 'La contraseñas no coinciden. 😞',
      });
      return;
    }
    const editUser = await editUser({name, surname, email, newPassword});
    if (editUser) {
      Toast.show({
        type: 'success',
        text1: 'Perfil',
        text2: 'Usuario editado correctamente. ',
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
    if (currentPassword.trim() === '') {
      empty.push('Contraseña');
    }
    if (newPassword.trim() === '') {
      empty.push('Confirmar contraseña');
    }
    return empty;
  };

  const cleanFields = () => {
    setValues({
      name: '',
      surname: '',
      email: '',
      currentPassword: '',
      newPassword: '',
    });
  };*/

  return (
    <View style={StylesRegister.profileSectionContainer}>
      <Text style={{paddingBottom: 10, color: 'white'}}>
        {<FontAwesomeIcon icon={faCircleUser} size={130} color="white" />}
      </Text>
      <View style={StylesRegister.containerInput}>
        <View style={StylesRegister.inputFieldProfile}>
          <Text style={StylesRegister.titleInput}>Nombre:</Text>
          <TextInput style={StylesRegister.input} placeholder="Nombre" />
        </View>

        <View style={StylesRegister.inputFieldProfile}>
          <Text style={StylesRegister.titleInput}>Apellidos:</Text>
          <TextInput style={StylesRegister.input} placeholder="Apellidos" />
        </View>

        <View style={StylesRegister.inputFieldProfile}>
          <Text style={StylesRegister.titleInput}>Correo electronico:</Text>
          <TextInput
            style={StylesRegister.input}
            placeholder="Correo electronico"
          />
        </View>

        <View style={StylesRegister.inputFieldProfile}>
          <Text style={StylesRegister.titleInput}>Nueva contraseña:</Text>
          <TextInput
            style={StylesRegister.input}
            placeholder="Nueva contraseña"
            secureTextEntry
          />
        </View>

        <View style={StylesRegister.inputFieldProfile}>
          <Text style={StylesRegister.titleInput}>Contraseña actual:</Text>
          <TextInput
            style={StylesRegister.input}
            placeholder="Contraseña actual"
            secureTextEntry
          />
        </View>
      </View>
      <View
        style={[StylesRegister.containerInput, StylesRegister.containerBtn]}>
        <TouchableOpacity style={StylesRegister.btn} onPress={() => { }}>
          <Text style={StylesRegister.btnText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
