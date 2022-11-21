import React, {useContext, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {PlusCircle} from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';
import StyleDate from './StyleDate';
import {UserContext} from '../../../context/UserContext';
import {Date as dateFirebase} from '../../../firebase';

const Dates = () => {
  const navigation = useNavigation();
  const {petSelected, newDate, setNewDate} = React.useContext(UserContext);
  const {getAllDates} = dateFirebase();
  const [DATA, setData] = React.useState([
    {
      id: 'new',
    },
  ]);

  const loadDates = React.useCallback(async () => {
    const response = await getAllDates(petSelected.id);
    setData([
      ...response,
      {
        id: 'new',
      },
    ]);
    setNewDate(false);
  }, [getAllDates]);

  React.useEffect(() => {
    newDate && loadDates();
  }, [newDate]);

  const Item = ({item: info}: any) => (
    <View style={{backgroundColor: '#095256'}}>
      <View style={StyleDate.item}>
        <View style={StyleDate.containerDates}>
          <Text style={StyleDate.itemText}>{info.title}</Text>
          <Text style={StyleDate.itemText}>
            {`Fecha: ${new Date(info.date.seconds * 1000).toLocaleDateString(
              'es-CR',
            )}`}
          </Text>
        </View>
        <View style={StyleDate.containerDates}>
          <TouchableOpacity
            style={StyleDate.btnDates}
            onPress={() => console.log('ver')}>
            <Text style={StyleDate.btnAddText}>Ver</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={StyleDate.btnDatesDelete}
            onPress={() => console.log('Eliminar')}>
            <Text style={StyleDate.btnAddText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const ItemNew = () => (
    <View style={StyleDate.newItem}>
      <TouchableOpacity
        style={StyleDate.btnAdd}
        onPress={() => navigation.navigate('dateAdd', {screen: 'NewDate'})}>
        <PlusCircle height={60} width={60} stroke="white" fill="transparent" />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item}: any) => {
    if (item.id !== 'new') {
      return <Item key={item.id} item={item} />;
    } else {
      return <ItemNew />;
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#202020',
        flex: 1,
      }}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{
          backgroundColor: '#202020',
        }}
      />
    </SafeAreaView>
  );
};

export default Dates;
