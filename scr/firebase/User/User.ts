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

  const updateUser = async (userId: string, dataUser: InputUser) => {
    try {
      await userRef
        .doc(userId)
        .update({
          name: dataUser.name,
          surname: dataUser.surname,
          email: dataUser.email,
          password: dataUser.password,
        })
        .then(response => {
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

  const addAlbumImage = async (userId: string, imageUrl: string) => {
    try {
      await userRef.doc(userId).update({
        album: firestore.FieldValue.arrayUnion(imageUrl),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getAlbum = async (userId: string) => {
    try {
      return await userRef.doc(userId).get();
    } catch (error) {
      console.error(error);
      return [
        {
          url: 'https://firebasestorage.googleapis.com/v0/b/health-pet-b5aac.appspot.com/o/images%2FpetProfile.jpg?alt=media&token=f78c4e98-3dbb-40ca-a7c6-087407f251b5',
        },
      ];
    }
  };

  return {
    addNewUser,
    checkUserData,
    checkIfEmailExists,
    updateUser,
    addAlbumImage,
    getAlbum,
  };
};

export default User;
