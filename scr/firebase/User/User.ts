import firestore from '@react-native-firebase/firestore';
import {User as UserType} from '../../interface';

const User = () => {
  const userRef = firestore().collection('User');

  const addNewUser = (user: UserType) => {
    try {
      userRef.add(user).then(response => {
        return true;
      });
    } catch (error) {
      return false;
    }
  };

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
  };
};

export default User;
