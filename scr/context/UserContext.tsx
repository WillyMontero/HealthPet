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
  newDate: boolean;
  setNewDate: any;
  setPetSelected: any;
  petSelected: {
    id: string;
    FK_User: string;
    bloodType: string;
    bornDate: any;
    name: string;
    petType: string;
    race: string;
    weight: string;
    imageProfile: string;
  };
  editPet: boolean;
  setEditPet: any;
  setDateSelected: any;
  dateSelected: {
    id: string;
    FK_Pet: string;
    date: any;
    medication: string;
    reason: string;
    title: string;
  };
  editDate: boolean;
  setEditDate: any;
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
  newDate: true,
  setNewDate: null,
  setPetSelected: null,
  petSelected: {
    id: '',
    FK_User: '',
    bloodType: '',
    bornDate: new Date(),
    name: '',
    petType: '',
    race: '',
    weight: '',
    imageProfile: '',
  },
  setDateSelected: null,
  dateSelected: {
    id: '',
    FK_Pet: '',
    date: new Date(),
    medication: '',
    reason: '',
    title: '',
  },
  editPet: false,
  setEditPet: null,
  editDate: false,
  setEditDate: null,
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
  const [editPet, setEditPet] = useState(false);
  const [editDate, setEditDate] = useState(false);
  const [newDate, setNewDate] = useState(true);
  const [petSelected, setPetSelected] = useState({
    id: '',
    FK_User: '',
    bloodType: '',
    bornDate: new Date(),
    name: '',
    petType: '',
    race: '',
    weight: '',
    imageProfile: '',
  });
  const [dateSelected, setDateSelected] = useState({
    id: '',
    FK_Pet: '',
    date: new Date(),
    medication: '',
    reason: '',
    title: '',
  });
  const values = {
    isLogged,
    setIsLogged,
    user,
    setUser,
    newPet,
    setNewPet,
    petSelected,
    setPetSelected,
    newDate,
    setNewDate,
    editPet,
    setEditPet,
    dateSelected,
    setDateSelected,
    editDate,
    setEditDate,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export {UserContext, UserProvider};
