import firestore from '@react-native-firebase/firestore';
import {Pet as PetType} from '../../interface';

const Pet = () => {
  const petRef = firestore().collection('Pet');

  const addNewPet = (pet: PetType) => {
    try {
      const petRef = firestore().collection('Pets');
      petRef.add(pet).then(response => {
        return true;
      });
    } catch (error) {
      return false;
    }
  };
};

export default Pet;
