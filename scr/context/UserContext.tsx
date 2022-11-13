// Context.tsx
import React, {createContext, useState} from 'react';

interface IUser {
  isLogged: boolean;
  setIsLogged: any;
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
  };
  setUser: any;
  newPet: boolean;
  setNewPet: any;
}

const initialState = {
  isLogged: false,
  setIsLogged: null,
  user: {
    id: '',
    name: '',
    surname: '',
    email: '',
    password: '',
  },
  setUser: null,
  newPet: true,
  setNewPet: null,
};

const UserContext = createContext<IUser>(initialState);

const UserProvider = (props: any) => {
  const [isLogged, setIsLogged] = useState(true);
  const [user, setUser] = useState({
    id: '',
    name: '',
    surname: '',
    email: '',
    password: '',
  });
  const [newPet, setNewPet] = useState(true);
  const values = {isLogged, setIsLogged, user, setUser, newPet, setNewPet};

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export {UserContext, UserProvider};
