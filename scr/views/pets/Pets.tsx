import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import {Trash2, Edit, PlusCircle} from 'react-native-feather';
import stylesPet from './stylesPet';
import {useNavigation} from '@react-navigation/native';

const Pets = () => {
  const navigation = useNavigation();
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Pipo',
    },
    {
      id: 'new',
    },
  ];

  const Item = ({title}: any) => (
    <View style={stylesPet.item}>
      <View style={stylesPet.containerImageItem}>
        <Image
          style={stylesPet.picture}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Frn_image_picker_lib_temp_4798c78e-746c-4a2a-9a25-717c4b2cc6a8.jpg?alt=media&token=253e526e-0308-4ce7-8e5b-e9f9a82993c7',
          }}
        />
      </View>
      <View style={stylesPet.containerDates}>
        <Text style={stylesPet.itemText}>{title}</Text>
        <TouchableOpacity
          style={stylesPet.btnDates}
          onPress={() =>
            navigation.navigate('petsAdd', {screen: 'DetailsScreen'})
          }>
          <Text style={stylesPet.btnAddText}>Citas</Text>
        </TouchableOpacity>
      </View>
      <View style={stylesPet.containerEditRemove}>
        <TouchableOpacity
          style={stylesPet.btnEditRemove}
          onPress={() => console.log('asd')}>
          <Edit stroke="white" fill="transparent" />
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesPet.btnEditRemove}
          onPress={() => console.log('asd')}>
          <Trash2 stroke="red" fill="transparent" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ItemNew = () => (
    <View style={stylesPet.newItem}>
      <TouchableOpacity
        style={stylesPet.btnAdd}
        onPress={() => console.log('asds')}>
        <PlusCircle stroke="white" fill="transparent" />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item}: any) => {
    if (item.id !== 'new') {
      return <Item title={item.title} />;
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

export default Pets;
