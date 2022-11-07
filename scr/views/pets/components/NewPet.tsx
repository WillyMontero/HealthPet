import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';

const NewPet = () => {
  const [values, setValues] = useState({user: '', password: ''});

  const onChange = (value: string, name: string) =>
    setValues(prev => ({...prev, [name]: value}));

  return (
    <View>
      <View>
        <Image
          style={null}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2Frn_image_picker_lib_temp_4798c78e-746c-4a2a-9a25-717c4b2cc6a8.jpg?alt=media&token=253e526e-0308-4ce7-8e5b-e9f9a82993c7',
          }}
        />
      </View>
      <View>
        <Text style={null}>Nombre:</Text>
        <TextInput
          style={null}
          placeholder="Correo electronico"
          value={'asd'}
          onChangeText={text => onChange(text, 'user')}
        />
      </View>
      <View>
        <Text style={null}>Tipo de mascota:</Text>
      </View>
      <View>
        <Text style={null}>Raza:</Text>
        <TextInput
          style={null}
          placeholder="Correo electronico"
          value={'asd'}
          onChangeText={text => onChange(text, 'user')}
        />
      </View>
      <View>
        <Text style={null}>Fecha de nacimiento:</Text>
      </View>
      <View>
        <Text style={null}>Peso:</Text>
        <TextInput
          style={null}
          placeholder="Correo electronico"
          value={'asd'}
          onChangeText={text => onChange(text, 'user')}
        />
      </View>
      <View>
        <Text style={null}>Tipo de sangre:</Text>
        <TextInput
          style={null}
          placeholder="Correo electronico"
          value={'asd'}
          onChangeText={text => onChange(text, 'user')}
        />
      </View>
      <View style={null}>
        <TouchableOpacity style={null} onPress={() => console.log('nuevo')}>
          <Text style={null}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewPet;
