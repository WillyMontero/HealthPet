// Context.tsx
import React, {createContext, useState} from 'react';

interface IUser {
  isLogged: boolean;
  setIsLogged: any;
}

const initialState = {
  isLogged: false,
  setIsLogged: null,
};

const UserContext = createContext<IUser>(initialState);

const UserProvider = (props: any) => {
  const [isLogged, setIsLogged] = useState(true);
  const values = {isLogged, setIsLogged};

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export {UserContext, UserProvider};
