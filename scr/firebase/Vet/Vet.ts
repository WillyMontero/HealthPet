import firestore from '@react-native-firebase/firestore';
import {InputVet, Vet as TypeVet} from '../../interface';

const Vet = () => {
  const vetRef = firestore().collection('Vet');

  const addNewVet = (vet: InputVet) => {
    try {
      vetRef.add(vet).then(() => {
        return true;
      });
    } catch (error) {
      return false;
    }
  };

  const updateVet = async (dataVet: TypeVet) =>
    await vetRef.doc(dataVet.id).set(dataVet);

  const deleteVet = async (vetId: string) => {
    return await vetRef
      .doc(vetId)
      .delete()
      .then(() => true)
      .catch(() => false);
  };

  const getVets = async (userId: string) => {
    const data: TypeVet[] = [];
    const vetData = await vetRef.doc(userId).get();
    console.log(vetData);
    return data;
  };

  const getAllVets = async () => {
    const vetData = await vetRef.get();
    return vetData.docs.map(vet => vet._data);
  };

  return {addNewVet, deleteVet, getVets, updateVet, getAllVets};
};

export default Vet;
