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
import StyleNewDate from './StyleNewDate';
import {UserContext} from '../../../context/UserContext';
import {Date as dateFirebase} from '../../../firebase';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const NewDate = () => {
  const {petSelected, setNewDate, dateSelected, editDate} =
    React.useContext(UserContext);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    id: !editDate ? '' : dateSelected.id,
    title: !editDate ? '' : dateSelected.title,
    reason: !editDate ? '' : dateSelected.reason,
    date: !editDate ? new Date() : new Date(dateSelected.date.seconds * 1000),
    medication: !editDate ? '' : dateSelected.medication,
    FK_Pet: !editDate ? '' : dateSelected.FK_Pet,
  });

  const {addNewDate, updateDate} = dateFirebase();
  const {title, reason, date, medication} = values;

  const onChange = (value: any, name: string) =>
    setValues(prev => ({...prev, [name]: value}));

  const clean = () => {
    setValues({
      id: '',
      title: '',
      reason: '',
      date: new Date(),
      medication: '',
      FK_Pet: '',
    });
  };

  const handleSave = async () => {
    !editDate
      ? addNewDate({
          title,
          reason,
          date,
          medication,
          FK_Pet: petSelected.id,
        })
      : updateDate({
          id: dateSelected.id,
          title,
          reason,
          date,
          medication,
          FK_Pet: petSelected.id,
        });
    !editDate
      ? Toast.show({
          type: 'success',
          text1: 'Agregar nueva cita',
          text2: '¡Cita agregada!',
        })
      : Toast.show({
          type: 'success',
          text1: 'Editar cita',
          text2: '¡Cita editada!',
        });
    clean();
    setNewDate(true);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={StyleNewDate.sectionContainer}>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={StyleNewDate.inputField}>
            <Text style={StyleNewDate.titleInput}>Razon:</Text>
            <TextInput
              style={StyleNewDate.input}
              placeholder="Razon"
              value={title}
              onChangeText={text => onChange(text, 'title')}
            />
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={StyleNewDate.inputField}>
            <Text style={StyleNewDate.titleInput}>Descripcion de la cita:</Text>
            <TextInput
              style={StyleNewDate.input}
              multiline
              numberOfLines={4}
              placeholder="Descripcion de la cita"
              value={reason}
              onChangeText={text => onChange(text, 'reason')}
            />
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={StyleNewDate.inputField}>
            <Text style={StyleNewDate.titleInput}>Fecha de la cita:</Text>
            <TouchableOpacity
              style={StyleNewDate.btnDate}
              onPress={() => setOpen(true)}>
              <Text style={StyleNewDate.btnDateText}>
                {date.toLocaleDateString('es-CR')}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={open}
              date={date}
              mode="date"
              locale={'es'}
              onConfirm={date => {
                setOpen(false);
                onChange(date, 'date');
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={StyleNewDate.inputField}>
            <Text style={StyleNewDate.titleInput}>Medicamentos:</Text>
            <TextInput
              style={StyleNewDate.input}
              multiline
              numberOfLines={4}
              placeholder="Medicamentos"
              value={medication}
              onChangeText={text => onChange(text, 'medication')}
            />
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={StyleNewDate.btnConteiner}>
            <TouchableOpacity
              style={StyleNewDate.btn}
              onPress={() => handleSave()}>
              <Text style={StyleNewDate.btnText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewDate;
