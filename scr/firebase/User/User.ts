import firestore from '@react-native-firebase/firestore';
import {InputUser, User as TypeUser} from '../../interface';

const User = () => {
  const userRef = firestore().collection('User');

  const addNewUser = async (user: InputUser) => {
    try {
      return userRef.add(user).then(response => {
        return true;
      });
    } catch (error) {
      return false;
    }
  };

  const updateUser = async (dataUser: TypeUser) =>
    await userRef.doc(dataUser.id).set(dataUser);

  const checkUserData = (email: string, password: string) => {
    return userRef
      .where('email', '==', email)
      .where('password', '==', password)
      .get()
      .then(response => {
        if (response.empty) return false;
        return {...response.docs[0].data(), id: response.docs[0].id};
      });
  };

  const checkIfEmailExists = async (email: string) => {
    return userRef
      .where('email', '==', email)
      .get()
      .then(response => !response.empty);
  };

  return {
    addNewUser,
    checkUserData,
    checkIfEmailExists,
    updateUser,
  };
};

export default User;
