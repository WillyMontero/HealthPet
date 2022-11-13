import firestore from '@react-native-firebase/firestore';
import {InputPet, Pet as TypePet} from '../../interface';

const Pet = () => {
  const petRef = firestore().collection('Pet');

  const addNewPet = (pet: InputPet) => {
    try {
      return petRef.add(pet).then(reponse => {
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

  const getPets = async (FK_User: string) => {
    const data: any[] = [];
    await petRef
      .where('FK_User', '==', FK_User)
      .get()
      .then(snapShot => {
        if (snapShot.empty) {
          console.log('F');
        } else {
          snapShot.docs.forEach(doc => {
            const newObj = {
              id: doc.id,
              FK_User: doc.get('FK_User'),
              bloodType: doc.get('bloodType'),
              bornDate: doc.get('bornDate'),
              name: doc.get('name'),
              petType: doc.get('petType'),
              race: doc.get('race'),
              weight: doc.get('weight'),
              imageProfile: doc.get('imageProfile'),
            };
            data.push(newObj);
          });
        }
      });
    return data;
  };

  return {addNewPet, deletePet, getPets, updatePet};
};

export default Pet;
