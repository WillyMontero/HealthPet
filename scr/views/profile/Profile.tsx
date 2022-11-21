import React, {useContext, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {User as userFirebase} from '../../firebase';
import StylesRegister from '../register/stylesRegister';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons/faCircleUser';
import {UserContext} from '../../context/UserContext';

const Profile = () => {
  const {user, setUser} = useContext(UserContext);

  const [values, setValues] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
    currentPassword: '',
    newPassword: '',
  });

  const {name, surname, email, currentPassword, newPassword} = values;

  const {updateUser} = userFirebase();

  const onChange = (value: string, name: string) =>
    setValues(prev => ({...prev, [name]: value}));

  const handleSave = async () => {
    const empty = isEmpty();
    if (empty.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Perfil',
        text2: 'Faltan espacios por llenar. 😞',
      });
      return;
    }
    if (currentPassword !== user.password) {
      Toast.show({
        type: 'error',
        text1: 'Perfil',
        text2: 'Su contraseña no coincide. 😞',
      });
      return;
    }
    try {
      await updateUser(user.id, {
        name: name,
        surname: surname,
        email: email,
        password: newPassword,
      }).then(() => {
        Toast.show({
          type: 'success',
          text1: 'Perfil',
          text2: 'Usuario editado correctamente.',
        });
        let updatedUserInfo = {
          name,
          surname,
          email,
          password: newPassword,
        };
        setUser({...user, ...updatedUserInfo});
        cleanFields();
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cleanFields();
  }, [user.name]);

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
      name: user.name,
      surname: user.surname,
      email: user.email,
      currentPassword: '',
      newPassword: '',
    });
  };

  return (
    <View style={StylesRegister.profileSectionContainer}>
      <Text style={{paddingBottom: 10, color: 'white'}}>
        {<FontAwesomeIcon icon={faCircleUser} size={130} color="white" />}
      </Text>
      <View style={StylesRegister.containerInput}>
        <View style={StylesRegister.inputFieldProfile}>
          <Text style={StylesRegister.titleInput}>Nombre:</Text>
          <TextInput
            style={StylesRegister.input}
            placeholder="Nombre"
            value={name}
            onChangeText={text => onChange(text, 'name')}
          />
        </View>

        <View style={StylesRegister.inputFieldProfile}>
          <Text style={StylesRegister.titleInput}>Apellidos:</Text>
          <TextInput
            style={StylesRegister.input}
            placeholder="Apellidos"
            value={surname}
            onChangeText={text => onChange(text, 'surname')}
          />
        </View>

        <View style={StylesRegister.inputFieldProfile}>
          <Text style={StylesRegister.titleInput}>Correo electronico:</Text>
          <TextInput
            style={StylesRegister.input}
            placeholder="Correo electronico"
            value={email}
            onChangeText={text => onChange(text, 'email')}
          />
        </View>

        <View style={StylesRegister.inputFieldProfile}>
          <Text style={StylesRegister.titleInput}>Nueva contraseña:</Text>
          <TextInput
            style={StylesRegister.input}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChangeText={text => onChange(text, 'newPassword')}
            secureTextEntry
          />
        </View>

        <View style={StylesRegister.inputFieldProfile}>
          <Text style={StylesRegister.titleInput}>Contraseña actual:</Text>
          <TextInput
            style={StylesRegister.input}
            placeholder="Contraseña actual"
            value={currentPassword}
            onChangeText={text => onChange(text, 'currentPassword')}
            secureTextEntry
          />
        </View>
      </View>
      <View
        style={[StylesRegister.containerInput, StylesRegister.containerBtn]}>
        <TouchableOpacity
          style={StylesRegister.btn}
          onPress={() => handleSave()}>
          <Text style={StylesRegister.btnText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
