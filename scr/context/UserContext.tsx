// Context.tsx
import React, {createContext, useState} from 'react';

interface IUser {
  isLogged: boolean;
  setIsLogged: any;
  user: {
    id: string;
    name: string;
    petType: string;
    race: string;
    bornDate: Date;
    weight: string;
    bloodType: string;
    FK_User: string;
  };
  setUser: any;
}

const initialState = {
  isLogged: false,
  setIsLogged: null,
  user: {
    id: '',
    name: '',
    petType: '',
    race: '',
    bornDate: new Date(),
    weight: '',
    bloodType: '',
    FK_User: '',
  },
  setUser: null,
};

const UserContext = createContext<IUser>(initialState);

const UserProvider = (props: any) => {
  const [isLogged, setIsLogged] = useState(true);
  const [user, setUser] = useState({
    id: '',
    name: '',
    petType: '',
    race: '',
    bornDate: new Date(),
    weight: '',
    bloodType: '',
    FK_User: '',
  });
  const values = {isLogged, setIsLogged, user, setUser};

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export {UserContext, UserProvider};
