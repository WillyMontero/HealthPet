import React from 'react';

import NavigationButton from './NavigationButton';
import Login from '../views/login/Login';
import {UserContext} from '../context/UserContext';
import {NativeRouter, Route, Routes} from 'react-router-native';
import Register from '../views/register/register';

const Main = () => {
  const {isLogged} = React.useContext(UserContext);
  return (
    <>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<NavigationButton />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </NativeRouter>
    </>
  );
};

export default Main;
