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
import {Pet as petFirebase} from '../../firebase';
import {UserContext} from '../../context/UserContext';

const Pets = () => {
  const {user, newPet, setNewPet} = React.useContext(UserContext);
  const navigation = useNavigation();
  const {getPets} = petFirebase();
  const [DATA, setData] = React.useState([
    {
      id: 'new',
    },
  ]);

  const loadPets = React.useCallback(async () => {
    const response = await getPets(user.id);
    setData([
      ...response,
      {
        id: 'new',
      },
    ]);
    setNewPet(false);
  }, [getPets]);

  React.useEffect(() => {
    newPet && loadPets();
  }, [newPet]);

  const Item = ({item: info}: any) => (
    <View style={stylesPet.item}>
      <View style={stylesPet.containerImageItem}>
        <Image
          style={stylesPet.picture}
          source={{
            uri:
              info?.imageProfile?.trim().length > 0
                ? info?.imageProfile
                : 'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2FpetProfile.jpg?alt=media&token=f78c4e98-3dbb-40ca-a7c6-087407f251b5',
          }}
        />
      </View>
      <View style={stylesPet.containerDates}>
        <Text style={stylesPet.itemText}>{info.name}</Text>
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
          onPress={() => console.log('elimnar')}>
          <Trash2 stroke="red" fill="transparent" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ItemNew = () => (
    <View style={stylesPet.newItem}>
      <TouchableOpacity
        style={stylesPet.btnAdd}
        onPress={() =>
          navigation.navigate('petsAdd', {screen: 'DetailsScreen'})
        }>
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

export default Pets;
