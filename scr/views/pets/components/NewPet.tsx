import React, {useContext, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import StyleNewPet from './StyleNewPet';
import {UserContext} from '../../../context/UserContext';
import {Pet as petFirebase} from '../../../firebase';
import Toast from 'react-native-toast-message';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';

const NewPet = () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: '',
    typePet: '',
    race: '',
    bornDate: new Date(),
    weight: '',
    bloodType: '',
    imageProfile: '',
  });

  const navigation = useNavigation();
  const {user, setNewPet} = useContext(UserContext);
  const {addNewPet} = petFirebase();

  const {name, bloodType, bornDate, race, typePet, weight, imageProfile} =
    values;

  const onChange = (value: any, name: string) =>
    setValues(prev => ({...prev, [name]: value}));

  const validate = () => {
    if (name.trim() === '') {
      return true;
    }
    if (race.trim() === '') {
      return true;
    }
    if (bloodType.trim() === '') {
      return true;
    }
    if (weight.trim() === '') {
      return true;
    }
    return false;
  };

  const clean = () => {
    setValues({
      name: '',
      typePet: '',
      race: '',
      bornDate: new Date(),
      weight: '',
      bloodType: '',
      imageProfile: '',
    });
  };

  const handleSaveNewPet = async () => {
    if (!validate) {
      Toast.show({
        type: 'error',
        text1: 'Agregar nueva mascota',
        text2: 'Debes completar todos los espacios. 😞',
      });
      return;
    }
    const response = addNewPet({
      bloodType,
      FK_User: user?.id,
      name,
      weight,
      bornDate,
      petType: typePet,
      race,
      imageProfile,
    });
    Toast.show({
      type: 'success',
      text1: 'Agregar nueva mascota',
      text2: '¡Mascota agregada!',
    });
    clean();
    setNewPet(true);
    navigation.navigate('Pets', {screen: 'pets'});
  };

  return (
    <SafeAreaView style={StyleNewPet.sectionContainer}>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Image
            style={StyleNewPet.picture}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Frn_image_picker_lib_temp_4798c78e-746c-4a2a-9a25-717c4b2cc6a8.jpg?alt=media&token=253e526e-0308-4ce7-8e5b-e9f9a82993c7',
            }}
          />
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={StyleNewPet.inputField}>
            <Text style={StyleNewPet.titleInput}>Nombre:</Text>
            <TextInput
              style={StyleNewPet.input}
              placeholder="Nombre"
              value={name}
              onChangeText={text => onChange(text, 'name')}
            />
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={StyleNewPet.inputField}>
            <Text style={StyleNewPet.titleInput}>Tipo de mascota:</Text>
            <RNPickerSelect
              style={{
                inputAndroid: {
                  backgroundColor: '#FFFFFF',
                  color: '#959595',
                },
              }}
              value={typePet}
              onValueChange={value => onChange(value, 'typePet')}
              items={[
                {label: 'Perro', value: 'perro'},
                {label: 'Gato', value: 'gato'},
                {label: 'Conejo', value: 'conejo'},
                {label: 'Ave', value: 'ave'},
                {label: 'Pez', value: 'pez'},
                {label: 'Serpiente', value: 'serpiente'},
                {label: 'Hamster', value: 'hamster'},
              ]}
            />
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={StyleNewPet.inputField}>
            <Text style={StyleNewPet.titleInput}>Raza:</Text>
            <TextInput
              style={StyleNewPet.input}
              placeholder="Raza"
              value={race}
              onChangeText={text => onChange(text, 'race')}
            />
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={StyleNewPet.inputField}>
            <Text style={StyleNewPet.titleInput}>Fecha de nacimiento:</Text>
            <TouchableOpacity
              style={StyleNewPet.btnDate}
              onPress={() => setOpen(true)}>
              <Text style={StyleNewPet.btnDateText}>
                {bornDate.toLocaleDateString('es-CR')}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={open}
              date={bornDate}
              mode="date"
              locale={'es'}
              onConfirm={date => {
                setOpen(false);
                onChange(date, 'bornDate');
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={StyleNewPet.inputField}>
            <Text style={StyleNewPet.titleInput}>Peso:</Text>
            <TextInput
              style={StyleNewPet.input}
              placeholder="Peso"
              value={weight}
              onChangeText={text => onChange(text, 'weight')}
            />
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={StyleNewPet.inputField}>
            <Text style={StyleNewPet.titleInput}>Tipo de sangre:</Text>
            <TextInput
              style={StyleNewPet.input}
              placeholder="Tipo de sangre"
              value={bloodType}
              onChangeText={text => onChange(text, 'bloodType')}
            />
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={StyleNewPet.btnConteiner}>
            <TouchableOpacity
              style={StyleNewPet.btn}
              onPress={() => handleSaveNewPet()}>
              <Text style={StyleNewPet.btnText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPet;
