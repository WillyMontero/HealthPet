import React, {useState} from 'react';
import {View, Text} from 'react-native';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    surmane: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChangeUser = (value: string) => {
    setValues(prev => ({...prev, user: value}));
  };

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Register;
