import firestore from '@react-native-firebase/firestore';
import {InputPet, Pet as TypePet} from '../../interface';

const Pet = () => {
  const petRef = firestore().collection('Pet');

  const addNewPet = (pet: InputPet) => {
    try {
      petRef.add(pet).then(() => {
        return true;
      });
    } catch (error) {
      return false;
    }
  };

  const updatePet = async (dataPet: TypePet) =>
    await petRef.doc(dataPet.id).set(dataPet);

  const deletePet = async (petId: string) => {
    return await petRef
      .doc(petId)
      .delete()
      .then(() => true)
      .catch(() => false);
  };

  const getPets = async (userId: string) => {
    const data: TypePet[] = [];
    const petData = await petRef.doc(userId).get();
    console.log(petData);
    return data;
  };

  return {addNewPet, deletePet, getPets, updatePet};
};

export default Pet;
