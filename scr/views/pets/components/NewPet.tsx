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
import {Camera} from 'react-native-feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Menu, MenuItem} from 'react-native-material-menu';
import storage from '@react-native-firebase/storage';
import {User as userFirebase} from '../../../firebase';

const NewPet = () => {
  const {user, setNewPet, editPet, petSelected, setEditPet, setPetSelected} =
    useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: !editPet ? '' : petSelected.name,
    typePet: !editPet ? '' : petSelected.petType,
    race: !editPet ? '' : petSelected.race,
    bornDate: !editPet
      ? new Date()
      : new Date(petSelected.bornDate.seconds * 1000),
    weight: !editPet ? '' : petSelected.weight,
    bloodType: !editPet ? '' : petSelected.bloodType,
    imageProfile: !editPet
      ? 'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2FpetProfile.jpg?alt=media&token=f78c4e98-3dbb-40ca-a7c6-087407f251b5'
      : petSelected.imageProfile,
  });

  const navigation = useNavigation();
  const {addNewPet, updatePet} = petFirebase();
  const [photoToUpload, setPhotoToUpload] = useState<any>(null);
  const {addAlbumImage} = userFirebase();

  const {name, bloodType, bornDate, race, typePet, weight, imageProfile} =
    values;
  const [photoURL, setPhotoURL] = useState<any>(imageProfile);

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
      imageProfile:
        'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2FpetProfile.jpg?alt=media&token=f78c4e98-3dbb-40ca-a7c6-087407f251b5',
    });
  };

  const uploadImage = async () => {
    try {
      const newRef = storage().ref('images/').child(photoToUpload.fileName);
      await newRef.putFile(photoToUpload.uri);
      let urlLink = await newRef.getDownloadURL();
      return urlLink;
    } catch (error) {
      console.log(error);
    }
    return '';
  };

  const handleSaveNewPet = async () => {
    if (validate()) {
      Toast.show({
        type: 'error',
        text1: 'Agregar nueva mascota',
        text2: 'Debes completar todos los espacios. 😞',
      });
      return;
    }
    if (photoToUpload !== null) {
      await uploadImage().then(value => {
        !editPet
          ? addNewPet({
              bloodType,
              FK_User: user?.id,
              name,
              weight,
              bornDate,
              petType: typePet,
              race,
              imageProfile: value,
            })
          : updatePet({
              id: petSelected.id,
              bloodType,
              FK_User: user?.id,
              name,
              weight,
              bornDate,
              petType: typePet,
              race,
              imageProfile: value,
            });
        //add image url to album
        addAlbumImage(user.id, value);
      });
    } else {
      !editPet
        ? addNewPet({
            bloodType,
            FK_User: user?.id,
            name,
            weight,
            bornDate,
            petType: typePet,
            race,
            imageProfile,
          })
        : updatePet({
            id: petSelected.id,
            bloodType,
            FK_User: user?.id,
            name,
            weight,
            bornDate,
            petType: typePet,
            race,
            imageProfile,
          });
    }
    !editPet
      ? Toast.show({
          type: 'success',
          text1: 'Agregar nueva mascota',
          text2: '¡Mascota agregada!',
        })
      : Toast.show({
          type: 'success',
          text1: 'Editar mascota',
          text2: '¡Mascota editada!',
        });
    clean();
    setPetSelected(null);
    setNewPet(true);
    setEditPet(false);
    navigation.goBack();
  };

  const loadPhoto = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});
      setPhotoURL(result.assets[0].uri);
      onChange(result.assets[0].uri, 'imageProfile');
      setPhotoToUpload(result.assets[0]);
      hideMenu();
    } catch (error) {
      console.log(error);
    }
  };

  const takePhoto = async () => {
    try {
      const result = await launchCamera({mediaType: 'photo'});
      setPhotoURL(result.assets[0].uri);
      onChange(result.assets[0].uri, 'imageProfile');
      setPhotoToUpload(result.assets[0]);
      hideMenu();
    } catch (error) {
      console.log(error);
    }
  };

  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  return (
    <SafeAreaView style={StyleNewPet.sectionContainer}>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Image
            style={StyleNewPet.picture}
            source={{
              uri: photoURL,
            }}
          />
        </View>
        <View
          style={{
            zIndex: 1,
            elevation: 1,
            marginTop: 90,
            marginLeft: 200,
            position: 'absolute',
          }}>
          <Menu
            visible={visible}
            anchor={
              <Camera
                fill={'black'}
                color={'white'}
                width={30}
                height={30}
                onTouchEnd={() => {
                  showMenu();
                }}
              />
            }
            onRequestClose={hideMenu}>
            <MenuItem onPress={() => takePhoto()}>Tomar Foto</MenuItem>
            <MenuItem onPress={() => loadPhoto()}>
              Seleccionar desde galería
            </MenuItem>
          </Menu>
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
