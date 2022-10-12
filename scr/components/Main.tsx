import React from 'react';

import NavigationButton from './NavigationButton';
import Login from '../views/login/Login';
import {UserContext} from '../context/UserContext';

const Main = () => {
  const {isLogged} = React.useContext(UserContext);
  return <>{!isLogged ? <Login /> : <NavigationButton />}</>;
};

export default Main;
